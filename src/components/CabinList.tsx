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

interface CabinListProps {
  filter?: string;
}
export default async function CabinList({ filter }: CabinListProps) {
  const cabins: Cabins[] = await getCabins();

  if (!cabins?.length) return null;

  let displayedCabins;

  switch (filter) {
    case "small":
      displayedCabins = cabins?.filter(cabin => cabin.maxCapacity <= 3);
      break;

    case "medium":
      displayedCabins = cabins?.filter(
        cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
      );
      break;

    case "large":
      displayedCabins = cabins?.filter(cabin => cabin.maxCapacity >= 8);
      break;

    default:
      displayedCabins = cabins;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins?.map(cabin => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}
