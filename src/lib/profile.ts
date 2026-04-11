import { User } from "@supabase/supabase-js";
import { Profile } from "./supabase";

export const DEFAULT_PROFILE_IMAGE = process.env.PUBLIC_URL + "/avatars/profile.jpg";
export const DEFAULT_COVER_IMAGE = process.env.PUBLIC_URL + "/photos/lake.jpg";

export const getDisplayName = (profile: Profile | null, user: User | null) => {
  const metadataName = user?.user_metadata?.name;
  const emailName = user?.email?.split("@")[0];

  return profile?.name || metadataName || emailName || "John Doe";
};

export const getDisplayAvatar = (profile: Profile | null) =>
  profile?.avatar_url || DEFAULT_PROFILE_IMAGE;

export const getDisplayCover = (profile: Profile | null) =>
  profile?.cover_url || DEFAULT_COVER_IMAGE;
