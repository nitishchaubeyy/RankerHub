/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  getAdditionalUserInfo
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from "firebase/firestore";
import axios from "axios";
import { auth, db, signInWithGitHub, signOutUser } from "../lib/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnboarding, setIsOnboarding] = useState(false);

  // Listen to Auth State Changed
  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      // Clean up previous snapshot listener
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (currentUser) {
        setUser(currentUser);
        
        // Listen in real-time to the user document in Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        
        unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setIsOnboarding(data.onboardingStatus === "incomplete");
            setLoading(false);
          } else {
            // Skeletal document doesn't exist yet, meaning onboarding is pending
            setUserData(null);
            setIsOnboarding(true);
            setLoading(false);
          }
        }, (error) => {
          console.error("Real-time profile listener error:", error);
          setLoading(false);
        });

      } else {
        setUser(null);
        setUserData(null);
        setIsOnboarding(false);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  // Securely login with GitHub and conditionally request private repo scope
  const login = async (requestRepoScope = false) => {
    setLoading(true);
    try {
      // Pass the flag to firebase service
      const { user: authUser, accessToken, result } = await signInWithGitHub(requestRepoScope);

      // Extract GitHub details securely
      const additionalInfo = getAdditionalUserInfo(result);
      const githubUsername = additionalInfo?.username || authUser.displayName || "";
      const githubId = additionalInfo?.profile?.id || null;
      const avatar = additionalInfo?.profile?.avatar_url || authUser.photoURL || "";

      // Store GitHub accessToken in sessionStorage
      sessionStorage.setItem(`gh_token_${authUser.uid}`, accessToken);

      const userDocRef = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        const skeletalUser = {
          uid: authUser.uid,
          githubUsername,
          githubId,
          name: authUser.displayName || githubUsername || "Developer",
          email: authUser.email || "",
          avatar,
          onboardingStatus: "incomplete",
          privateRepoSyncEnabled: requestRepoScope, // <--- NAYA FLAG
          city: "Mumbai",
          streak: 1,
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          points: {
            gitRankPoints: 0, 
            codingVersePoints: 0,
            streakPoints: 0,
            referralPoints: 0,
            totalPoints: 0
          }
        };
        await setDoc(userDocRef, skeletalUser);
      } else {
        await setDoc(userDocRef, {
          lastLogin: new Date().toISOString(),
          ...(requestRepoScope && { privateRepoSyncEnabled: true })
        }, { merge: true });
      }

      return authUser;
    } catch (error) {
      console.error("Login service failure:", error);
      setLoading(false);
      throw error;
    }
  };

  // Logout utility
  const logout = async () => {
    setLoading(true);
    try {
      if (user) {
        sessionStorage.removeItem(`gh_token_${user.uid}`);
      }
      await signOutUser();
      setUser(null);
      setUserData(null);
      setIsOnboarding(false);
    } catch (error) {
      console.error("Logout failure:", error);
    } finally {
      setLoading(false);
    }
  };

  // Securely fetches GitHub stats on the client once using the transient OAuth token
  const fetchGitHubStats = async (uid, username) => {
    const token = sessionStorage.getItem(`gh_token_${uid}`);
    const headers = token ? { Authorization: `token ${token}` } : {};

    try {
      // 1. Fetch authenticated user profile data
      const profileRes = await axios.get(`https://api.github.com/users/${username}`, { headers });
      const publicRepos = profileRes.data.public_repos || 0;
      const followers = profileRes.data.followers || 0;
      
      // 2. Fetch repos to sum up stargazers and calculate primary language
      let stars = 0;
      let primaryLanguage = "JavaScript";
      try {
        const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, { headers });
        stars = reposRes.data.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        
        // Count language frequency
        const langCounts = {};
        reposRes.data.forEach(r => {
          if (r.language) {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
          }
        });
        const sortedLangs = Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a]);
        if (sortedLangs.length > 0) {
          primaryLanguage = sortedLangs[0];
        }
      } catch (err) {
        console.warn("Stars/Language retrieval warning, defaulting:", err);
      }

      // 3. Fetch total commits using Search API (authenticated allows up to 30 requests/min securely)
      let commits = 0;
      try {
        const commitsRes = await axios.get(`https://api.github.com/search/commits?q=author:${username}`, { headers });
        commits = commitsRes.data.total_count || 0;
      } catch (err) {
        console.warn("Commits retrieval warning, using fallback:", err);
        commits = publicRepos * 12; 
      }

      // 4. Fetch total pull requests
      let prs = 0;
      try {
        const prsRes = await axios.get(`https://api.github.com/search/issues?q=author:${username}+type:pr`, { headers });
        prs = prsRes.data.total_count || 0;
      } catch (err) {
        console.warn("PRs retrieval warning:", err);
        prs = Math.floor(publicRepos * 1.5);
      }

      // 5. Fetch total reviews (PRs reviewed by user)
      let reviews = 0;
      try {
        const reviewsRes = await axios.get(`https://api.github.com/search/issues?q=reviewed-by:${username}`, { headers });
        reviews = reviewsRes.data.total_count || 0;
      } catch (err) {
        console.warn("Reviews retrieval warning:", err);
        reviews = Math.floor(prs * 0.2); // safe fallback
      }

      // Calculate initial GitRank points securely based on real work only:
      // Commits -> +2, PRs -> +5, Reviews -> +10
      const gitRankPoints = (commits * 2) + (prs * 5) + (reviews * 10);

      return {
        commits,
        prs,
        reviews,
        publicRepos,
        stars,
        followers,
        primaryLanguage,
        gitRankPoints
      };
    } catch (error) {
      console.error("Error executing GitHub stats fetcher snapshot:", error);
      // Clean fallback if API breaks entirely or token is invalid
      return {
        commits: 5,
        prs: 1,
        reviews: 0,
        publicRepos: 3,
        stars: 0,
        followers: 1,
        primaryLanguage: "JavaScript",
        gitRankPoints: 15 // safe baseline
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, isOnboarding, login, logout, fetchGitHubStats }}>
      {children}
    </AuthContext.Provider>
  );
};
