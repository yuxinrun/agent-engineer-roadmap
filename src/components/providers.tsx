"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ProgressProvider } from "@/lib/store/progress-context";
import { FavoritesProvider } from "@/lib/store/favorites-context";
import { ProfileProvider } from "@/lib/store/profile-context";
import { ProjectsProvider } from "@/lib/store/projects-context";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProfileProvider>
        <ProgressProvider>
          <FavoritesProvider>
            <ProjectsProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </ProjectsProvider>
          </FavoritesProvider>
        </ProgressProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}
