import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "Student" | "ClubAdmin" | "UniversityAdmin";

type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

type AuthStore = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => {
        localStorage.removeItem("accessToken");
        set({ token: null, user: null });
      },
    }),
    {
      name: "hamro-student-hub-auth",
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          localStorage.setItem("accessToken", state.token);
        }
      },
    },
  ),
);
