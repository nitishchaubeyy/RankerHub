const developers = [
  {
    id: "sarah_c",
    name: "Sarah Chen",
    username: "sarah_c",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    role: "Systems Engineer",
    bio: "Builds resilient Rust services and mentors developers moving into systems programming.",
    tags: ["Rust", "Systems", "Mentorship"],
    mutualFriends: 12,
    online: true,
    activity: "Published a Rust ownership guide 2h ago"
  },
  {
    id: "marcusv",
    name: "Marcus Vance",
    username: "marcusv",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    role: "Backend Architect",
    bio: "Designs Go APIs, event-driven platforms, and observability workflows for product teams.",
    tags: ["Go", "APIs", "Architecture"],
    mutualFriends: 8,
    online: false,
    activity: "Completed a distributed systems challenge"
  },
  {
    id: "aiko_t",
    name: "Aiko Tanaka",
    username: "aiko_t",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    role: "Android Developer",
    bio: "Creates Kotlin learning paths and mobile accessibility experiments for community builders.",
    tags: ["Kotlin", "Android", "Accessibility"],
    mutualFriends: 10,
    online: true,
    activity: "Joined the mobile leaderboard sprint"
  },
  {
    id: "sofia_r",
    name: "Sofia Rodriguez",
    username: "sofia_r",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    role: "UI Engineer",
    bio: "Turns complex product states into polished React interfaces with motion and design systems.",
    tags: ["React", "Design Systems", "Motion"],
    mutualFriends: 15,
    online: true,
    activity: "Shared a component testing checklist"
  },
  {
    id: "elena_r",
    name: "Elena Rostova",
    username: "elena_r",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    role: "Data Scientist",
    bio: "Explores ranking models, Python notebooks, and explainable AI projects for learners.",
    tags: ["Python", "AI", "Data"],
    mutualFriends: 6,
    online: false,
    activity: "Reviewed a model evaluation notebook"
  },
  {
    id: "tariq_m",
    name: "Tariq Mahmood",
    username: "tariq_m",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    role: "Fullstack Developer",
    bio: "Ships React dashboards, Node services, and practical deployment notes for junior teams.",
    tags: ["React", "Node", "DevOps"],
    mutualFriends: 5,
    online: true,
    activity: "Started a Node performance discussion"
  },
  {
    id: "leo_d",
    name: "Leo Dubois",
    username: "leodubois",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    role: "Rails Developer",
    bio: "Helps teams simplify Rails monoliths and document cleaner domain boundaries.",
    tags: ["Ruby", "Rails", "Testing"],
    mutualFriends: 4,
    online: false,
    activity: "Opened a refactor planning thread"
  },
  {
    id: "priya_shah",
    name: "Priya Shah",
    username: "priya_shah",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    role: "Security Researcher",
    bio: "Documents secure coding habits, CTF walkthroughs, and practical threat modeling lessons.",
    tags: ["Security", "C++", "CTF"],
    mutualFriends: 3,
    online: true,
    activity: "Posted a secure auth checklist"
  }
];

export const initialConnectionState = {
  followingIds: ["sarah_c", "marcusv", "aiko_t", "sofia_r"],
  followerIds: ["sarah_c", "elena_r", "tariq_m", "leo_d", "priya_shah"]
};

export const getSocialGraph = () => ({
  developers,
  followingIds: initialConnectionState.followingIds,
  followerIds: initialConnectionState.followerIds
});

export const toggleFollowStatus = (followingIds, developerId) => {
  if (followingIds.includes(developerId)) {
    return followingIds.filter((id) => id !== developerId);
  }

  return [...followingIds, developerId];
};

export const hydrateConnections = ({ followingIds, followerIds }) => {
  const following = developers.filter((developer) => followingIds.includes(developer.id));
  const followers = developers.filter((developer) => followerIds.includes(developer.id));
  const friends = developers.filter(
    (developer) => followingIds.includes(developer.id) && followerIds.includes(developer.id)
  );
  const suggested = developers.filter((developer) => !followingIds.includes(developer.id));

  return {
    friends,
    followers,
    following,
    suggested
  };
};
