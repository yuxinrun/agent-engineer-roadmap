"use client";

import * as React from "react";
import type { UserProfile } from "@/lib/types";

const STORAGE_KEY = "agent-roadmap:profile";

const DEFAULT_PROFILE: UserProfile = {
  background: "",
  weeklyHours: 10,
  targetWeeks: 20,
  startDate: "",
  goal: "",
};

interface ProfileContextValue {
  profile: UserProfile;
  updateProfile: (patch: Partial<UserProfile>) => void;
  isHydrated: boolean;
}

const ProfileContext = React.createContext<ProfileContextValue | null>(null);

function readStorage(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw
      ? { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as UserProfile) }
      : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = React.useState<UserProfile>(DEFAULT_PROFILE);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setProfile(readStorage());
    setIsHydrated(true);
  }, []);

  const updateProfile = React.useCallback((patch: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isHydrated }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = React.useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return ctx;
}
