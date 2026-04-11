import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, Profile } from "../lib/supabase";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfileImages: (updates: { avatar_url?: string; cover_url?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
  refreshProfile: async () => {},
  updateProfileImages: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfileStorageKey = (userId: string) => `socialbook-profile-images:${userId}`;

  const getStoredProfileImages = (userId: string) => {
    try {
      const raw = window.localStorage.getItem(getProfileStorageKey(userId));
      if (!raw) return {};
      return JSON.parse(raw) as { avatar_url?: string; cover_url?: string };
    } catch (error) {
      console.error("Failed to read stored profile images:", error);
      return {};
    }
  };

  const applyStoredProfileImages = (baseProfile: Profile | null, userId: string) => {
    const storedImages = getStoredProfileImages(userId);
    if (!baseProfile && !storedImages.avatar_url && !storedImages.cover_url) {
      return baseProfile;
    }

    if (!baseProfile) {
      return {
        id: userId,
        name: user?.user_metadata?.name || user?.email?.split("@")[0] || "John Doe",
        bio: "",
        location: "",
        avatar_url: storedImages.avatar_url || "",
        cover_url: storedImages.cover_url || null,
        friends_count: 0,
        created_at: new Date().toISOString(),
      } as Profile;
    }

    if (!storedImages.avatar_url && !storedImages.cover_url) {
      return baseProfile;
    }

    return {
      ...baseProfile,
      ...storedImages,
    };
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Failed to fetch profile:", error.message);
        setProfile(null);
        return;
      }

      setProfile(applyStoredProfileImages((data as Profile | null) ?? null, userId));
    } catch (error) {
      console.error("Unexpected profile fetch error:", error);
      setProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Failed to initialize auth session:", error);
        if (isMounted) {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("AUTH CHANGE:", _event, session);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          void fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  const updateProfileImages = async (updates: { avatar_url?: string; cover_url?: string }) => {
    if (!user) return;

    const nextImages = {
      ...getStoredProfileImages(user.id),
      ...updates,
    };

    try {
      window.localStorage.setItem(getProfileStorageKey(user.id), JSON.stringify(nextImages));
    } catch (error) {
      console.error("Failed to store profile images:", error);
    }

    setProfile((currentProfile) => {
      if (!currentProfile) {
        return {
          id: user.id,
          name: user.user_metadata?.name || user.email?.split("@")[0] || "John Doe",
          bio: "",
          location: "",
          avatar_url: updates.avatar_url || "",
          cover_url: updates.cover_url || null,
          friends_count: 0,
          created_at: new Date().toISOString(),
        };
      }

      return {
        ...currentProfile,
        ...updates,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, logout, refreshProfile, updateProfileImages }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
