import {
  deleteUser as deleteUserApi,
  updateUser as updateUserApi,
} from "./../api/api.db";
import { create } from "zustand";
import type { User } from "@/entities/user/types/types";
import { useAuthStore } from "@/entities/auth/model/store";

interface UserState {
  user: User;
  loading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (id: User["id"], data: Partial<User>) => void;
  deleteUser: (id: User["id"]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {} as User,
  loading: true,

  setUser: (user) => set({ user, loading: false }),
  clearUser: () => set({ user: {} as User }),

  updateUser: async (id, data) => {
    await updateUserApi({
      id,
      data,
    });
  },
  deleteUser: async (id) => {
    await deleteUserApi(id);
    useAuthStore.getState().checkSession();
  },
}));
