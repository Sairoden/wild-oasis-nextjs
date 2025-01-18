"use server";

// NEXT
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// AUTH
import { auth, signIn, signOut } from "./auth";

// SUPABASE
import { supabase } from "./supabase";
import { getBookings, updateBooking } from "./data-service";

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

export const createReservation = async (bookingData, formData) => {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
};

export const deleteReservation = async bookingId => {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map(booking => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
};

export const updateReservation = async formData => {
  const reservationId = Number(formData.get("reservationId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);
  const updateData = { numGuests, observations };

  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map(booking => booking.id);

  if (!guestBookingIds.includes(reservationId))
    throw new Error("You are not allowed to update this booking");

  await updateBooking(reservationId, updateData);

  redirect("/account/reservations");
};
