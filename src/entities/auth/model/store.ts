import { create } from "zustand";
import type {
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import type { User } from "@/entities/user/types/types";
import {
  getSession,
  onAuthStateChange,
  signInWithPassword,
  signOut,
  signUp,
} from "../api/api.db";

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<void>;
  signUp: (credentials: SignUpWithPasswordCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  loading: true,

  signIn: async (credentials) => {
    const { error, data } = await signInWithPassword(credentials);
    if (error) throw error;
    await get().checkSession();
    return { success: true, data };
  },

  signUp: async (credentials) => {
    const { error, data } = await signUp(credentials);
    if (error) throw error;
    await get().checkSession();
    return { success: true, data };
  },

  signOut: async () => {
    const { error } = await signOut();
    if (error) throw error;
    set({ session: null, user: null });
  },

  checkSession: async () => {
    set({ loading: true });
    const {
      data: { session },
    } = await getSession();
    set({ session, user: session?.user ?? null, loading: false });
  },
}));

onAuthStateChange((_event, session) => {
  useAuthStore.setState({
    session,
    user: session?.user ?? null,
    loading: false,
  });
});

useAuthStore.getState().checkSession();
