import React, { createContext, useContext, useState } from "react";
import {
  DemoUser, Profile, enterDemo, getCurrentUser, getDemoProfile, leaveDemo, saveDemoProfile,
} from "../lib/demo";

interface AuthContextType {
  user: DemoUser | null;
  profile: Profile | null;
  loading: boolean;
  login: (identity: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileImages: (updates: { avatar_url?: string; cover_url?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DemoUser | null>(getCurrentUser);
  const [profile, setProfile] = useState<Profile | null>(() => user ? getDemoProfile(user) : null);

  const login = async (identity: string, name?: string) => {
    const nextUser = enterDemo(identity, name);
    const nextProfile = getDemoProfile(nextUser);
    saveDemoProfile(nextProfile);
    setUser(nextUser);
    setProfile(nextProfile);
  };

  const logout = async () => {
    leaveDemo();
    setUser(null);
    setProfile(null);
  };

  const updateProfileImages = async (updates: { avatar_url?: string; cover_url?: string }) => {
    if (!user) return;
    const nextProfile = { ...(profile ?? getDemoProfile(user)), ...updates };
    saveDemoProfile(nextProfile);
    setProfile(nextProfile);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading: false, login, logout, updateProfileImages }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};