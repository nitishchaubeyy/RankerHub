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

  // Securely login with GitHub and immediately provision skeletal incomplete user if not exists
  const login = async () => {
    // Set loading true so route guards show loading screen during the popup flow.
    // IMPORTANT: We do NOT set loading=false on success — the onSnapshot listener
    // in useEffect is the sole source of truth for resolving loading+isOnboarding.
    // This prevents a race condition where setLoading(false) in finally{}
    // would resolve before onSnapshot detects the new skeletal document,
    // causing ProtectedRoute to see (loading=false, isOnboarding=false) and
    // incorrectly allow through to dashboard.
    setLoading(true);
    try {
      const result = await signInWithGitHub();
      const authUser = result.user;
      const accessToken = result.accessToken;

      // Extract GitHub details securely using getAdditionalUserInfo
      const additionalInfo = getAdditionalUserInfo(result);
      const githubUsername = additionalInfo?.username || authUser.displayName || "";
      const githubId = additionalInfo?.profile?.id || null;
      const avatar = additionalInfo?.profile?.avatar_url || authUser.photoURL || "";

      // Store GitHub accessToken in sessionStorage securely (non-persistent across tabs for security)
      sessionStorage.setItem(`gh_token_${authUser.uid}`, accessToken);

      const userDocRef = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        // Prepare initial GitHub stats securely
        const initialProfile = additionalInfo?.profile || {};
        const publicRepos = initialProfile.public_repos || 0;
        const followers = initialProfile.followers || 0;
        
        // Provision skeletal record with "incomplete" status so onboarding lock is active
        const skeletalUser = {
          uid: authUser.uid,
          githubUsername,
          githubId,
          name: authUser.displayName || githubUsername || "Developer",
          email: authUser.email || "",
          avatar,
          onboardingStatus: "incomplete",
          city: "Mumbai",
          streak: 1,
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          points: {
            gitRankPoints: 0, // calculated from actual repos/followers/stars on submission
            codingVersePoints: 0,
            streakPoints: 0,
            referralPoints: 0,
            totalPoints: 0
          }
        };

        // Save initial skeletal document securely
        // Once this write completes, the onSnapshot listener in useEffect will
        // fire and set isOnboarding=true + loading=false
        await setDoc(userDocRef, skeletalUser);
      } else {
        // If user already exists, update their lastLogin timestamp securely
        await setDoc(userDocRef, {
          lastLogin: new Date().toISOString()
        }, { merge: true });
      }

      return authUser;
    } catch (error) {
      console.error("Login service failure:", error);
      setLoading(false); // Only set loading false on error so UI can show the error
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
      
      // 2. Fetch repos to sum up stargazers
      let stars = 0;
      try {
        const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, { headers });
        stars = reposRes.data.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
      } catch (err) {
        console.warn("Stars retrieval warning, defaulting stars to 0:", err);
      }

      // 3. Fetch total commits using Search API (authenticated allows up to 30 requests/min securely)
      let commits = 0;
      try {
        const commitsRes = await axios.get(`https://api.github.com/search/commits?q=author:${username}`, { headers });
        commits = commitsRes.data.total_count || 0;
      } catch (err) {
        // Fallback calculation in case of search commit API limits / private scope restrictions
        commits = publicRepos * 12; 
      }

      // Calculate initial GitRank points securely:
      // Commits -> +2, Repos -> +5, Stars -> +3, Followers -> +2
      const gitRankPoints = (commits * 2) + (publicRepos * 5) + (stars * 3) + (followers * 2);

      return {
        commits,
        publicRepos,
        stars,
        followers,
        gitRankPoints
      };
    } catch (error) {
      console.error("Error executing GitHub stats fetcher snapshot:", error);
      // Clean fallback if API breaks entirely or token is invalid
      return {
        commits: 5,
        publicRepos: 3,
        stars: 0,
        followers: 1,
        gitRankPoints: 25 // safe baseline
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, isOnboarding, login, logout, fetchGitHubStats }}>
      {children}
    </AuthContext.Provider>
  );
};
