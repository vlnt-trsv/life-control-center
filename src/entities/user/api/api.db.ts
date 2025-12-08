import { supabase } from "@/shared/api/supabaseClient";
import type { User } from "../types/types";

export const updateUser = async (params: {
  id: User["id"];
  data: Partial<User>;
}): Promise<void> => {
  const { error } = await supabase.auth.updateUser({
    data: params.data,
  });

  if (error) throw error;
};

export const deleteUser = async (id: User["id"]) => {
  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) throw error;
};
