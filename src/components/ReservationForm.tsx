"use client";

// NEXT
import Image from "next/image";

// LIBRARIES
import { differenceInDays } from "date-fns";

// CONTEXTS
import { useReservationContext } from "@/context";

// LIB
import { createReservation } from "@/lib/actions";

// COMPONENTS
import SubmitButton from "./SubmitButton";

interface ReservationFormProps {
  cabin: {
    id: string;
    name: string;
    maxCapacity: number;
    image: string;
    description: string;
    regularPrice: number;
    discount: number;
  };
  user: {
    image?: string | null;
    name?: string | null;
  };
}

export default function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, handleResetRange } = useReservationContext();

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights =
    endDate && startDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createReservation.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          {user.image && (
            <Image
              referrerPolicy="no-referrer"
              className="rounded-full"
              width={28}
              height={28}
              src={user.image}
              alt={user.name || "User"}
            />
          )}
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async formData => {
          await createBookingWithData(formData);
          handleResetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          >
            <option value="" key="">
              Select number of guests...
            </option>

            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(x => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay
          </label>

          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc...?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}
