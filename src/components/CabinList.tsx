// COMPONENTS
import { CabinCard } from "@/components";

// LIB
import { getCabins } from "@/lib/data-service";

type Cabins = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};

export default async function CabinList() {
  const cabins: Cabins[] = await getCabins();

  if (!cabins?.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins?.map(cabin => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}
