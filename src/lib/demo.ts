import { readStored, writeStored } from "./storage";

export interface DemoUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  name: string;
  bio: string;
  location: string;
  avatar_url: string;
  cover_url?: string | null;
  friends_count: number;
  created_at: string;
}

const SESSION_KEY = "socialbook-demo-user";
const userKey = (id: string) => `socialbook-demo-user:${id}`;
const profileKey = (id: string) => `socialbook-demo-profile:${id}`;

const isDemoUser = (value: DemoUser | null): value is DemoUser =>
  Boolean(value && typeof value.id === "string" && typeof value.email === "string" &&
    typeof value.name === "string" && typeof value.createdAt === "string");

export const getCurrentUser = () => {
  const stored = readStored<DemoUser | null>(SESSION_KEY, null);
  return isDemoUser(stored) ? stored : null;
};

export const enterDemo = (identity: string, name?: string): DemoUser => {
  const email = identity.trim().toLowerCase() || "guest@demo.local";
  const id = `demo:${email}`;
  const previous = readStored<DemoUser | null>(userKey(id), null);
  const user: DemoUser = {
    id,
    email,
    name: name?.trim() || (isDemoUser(previous) ? previous.name : "") ||
      (identity.trim() ? identity.trim().split("@")[0] : "Guest"),
    createdAt: isDemoUser(previous) ? previous.createdAt : new Date().toISOString(),
  };
  writeStored(userKey(id), user);
  writeStored(SESSION_KEY, user);
  return user;
};

export const leaveDemo = () => writeStored(SESSION_KEY, null);

export const getDemoProfile = (user: DemoUser): Profile => {
  const stored = readStored<Profile | null>(profileKey(user.id), null);
  if (stored && stored.id === user.id && typeof stored.name === "string") {
    return { ...stored, name: user.name };
  }
  return {
    id: user.id,
    name: user.name,
    bio: "Exploring Socialbook",
    location: "",
    avatar_url: "",
    cover_url: null,
    friends_count: 342,
    created_at: user.createdAt,
  };
};

export const saveDemoProfile = (profile: Profile) => writeStored(profileKey(profile.id), profile);