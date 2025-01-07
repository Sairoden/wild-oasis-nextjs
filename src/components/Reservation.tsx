// COMPONENTS
import { ReservationForm, DateSelector } from "@/components";

// LIB
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";

interface ReservationProps {
  cabin: {
    id: string;
    name: string;
    maxCapacity: number;
    image: string;
    description: string;
  };
}

export default async function Reservation({ cabin }: ReservationProps) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector settings={settings} bookedDates={bookedDates} />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
