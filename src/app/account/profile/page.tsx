// NEXT
import type { Metadata } from "next";

// COMPONENTS
import { SelectCountry, UpdateProfileForm } from "@/components";

export const metadata: Metadata = {
  title: "Update profile",
};

export default async function ProfilePage() {
  // const countryFlag: string = "/pt.jpg";
  const nationality: string = "portugal";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
