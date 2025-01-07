// REACT
import { Suspense } from "react";

// COMPONENTS
import { Reservation, Spinner, Cabin } from "@/components";

// LIB
import { getCabin, getCabins } from "@/lib/data-service";

interface CabinProps {
  params: Promise<{ cabinId: string }>;
}

export const generateMetadata = async ({ params }: CabinProps) => {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
};

export const generateStaticParams = async () => {
  const cabins = await getCabins();
  return cabins?.map(cabin => ({ cabinId: String(cabin.id) }));
};

export default async function CabinPage({ params }: CabinProps) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve Cabin {cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
