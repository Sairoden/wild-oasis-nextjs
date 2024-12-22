// NEXT
import type { Metadata } from "next";

// COMPONENTS
import { CabinCard } from "@/components";

export const metadata: Metadata = {
  title: "Cabins",
};

type CabinsData = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};

export default function CabinsPage() {
  const cabins: CabinsData[] = [
    {
      id: 1,
      name: "Mountain Retreat",
      maxCapacity: 4,
      regularPrice: 200,
      discount: 20,
      image: "/images/cabin1.jpg",
    },
    {
      id: 2,
      name: "Forest Hideaway",
      maxCapacity: 6,
      regularPrice: 250,
      discount: 30,
      image: "/images/cabin2.jpg",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>

      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {cabins?.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins?.map(cabin => (
            <CabinCard key={cabin.id} cabin={cabin} />
          ))}
        </div>
      )}
    </div>
  );
}
