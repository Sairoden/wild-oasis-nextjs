"use client";

// REACT
import { ReactNode } from "react";

// NEXT
import Image from "next/image";

// LIB
import { updateGuest } from "@/lib/actions";

// COMPONENTS
import { SubmitButton } from "./index";

export default function UpdateProfileForm({
  children,
  guest,
}: {
  children: ReactNode;
  guest: {
    nationality: string;
    fullName: string;
    email: string;
    nationalID: number;
    countryFlag: string;
  };
}) {
  const { fullName, email, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="fullName">Full Name</label>
        <input
          defaultValue={fullName}
          type="text"
          name="fullName"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email">Email Address</label>
        <input
          defaultValue={email}
          type="text"
          name="email"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <Image
            src={countryFlag}
            alt="Country Flag"
            className="rounded-sm h-4 w-4"
            width={24}
            height={24}
            priority={true}
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}
