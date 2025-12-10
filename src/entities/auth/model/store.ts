import { create } from "zustand";
import type {
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import {
  getSession,
  onAuthStateChange,
  signInWithPassword,
  signOut,
  signUp,
} from "../api/api.db";
import { useUserStore } from "@/entities/user/model/store";

interface AuthState {
  session: Session | null;
  loading: boolean;
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<void>;
  signUp: (credentials: SignUpWithPasswordCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  loading: true,

  signIn: async (credentials) => {
    const { error } = await signInWithPassword(credentials);
    if (error) throw error;
    await get().checkSession();
  },

  signUp: async (credentials) => {
    const { error } = await signUp(credentials);
    if (error) throw error;
    await get().checkSession();
  },

  signOut: async () => {
    const { error } = await signOut();
    if (error) throw error;
    set({ session: null });
    useUserStore.getState().clearUser();
  },

  checkSession: async () => {
    set({ loading: true });
    const {
      data: { session },
    } = await getSession();

    set({ session, loading: false });
    if (session?.user) {
      useUserStore.getState().setUser(session.user);
    }
  },
}));

onAuthStateChange((_event, session) => {
  useAuthStore.setState({
    session,
    loading: false,
  });
  if (session?.user) {
    useUserStore.getState().setUser(session?.user);
  }
});

useAuthStore.getState().checkSession();
