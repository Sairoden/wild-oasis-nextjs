// COMPONENTS
import { Spinner } from "@/components";

export default function CabinsLoading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
