import { supabase } from "./supabase";

export const signUpStudent = async ({ name, email, password, classLevel }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        class: classLevel
      }
    }
  });

  if (error) throw error;
  return data;
};

export const loginStudent = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
};

export const logoutStudent = async () => {
  await supabase.auth.signOut();
};