"use server";

// NEXT
import { revalidatePath } from "next/cache";

// AUTH
import { auth, signIn, signOut } from "./auth";

// SUPABASE
import { supabase } from "./supabase";

export const signInAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signOutAction = async () => {
  await signOut({
    redirectTo: "/",
  });
};

export const updateGuest = async formData => {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  console.log(session.user);

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error.message);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
};
