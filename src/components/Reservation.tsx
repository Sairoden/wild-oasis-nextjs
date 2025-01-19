// COMPONENTS
import { ReservationForm, DateSelector, LoginMessage } from "@/components";

// LIB
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import { auth } from "@/lib/auth";

interface ReservationProps {
  cabin: {
    id: string;
    name: string;
    maxCapacity: number;
    image: string;
    description: string;
    regularPrice: number;
    discount: number;
  };
}

export default async function Reservation({ cabin }: ReservationProps) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id).then(dates =>
      dates.map(date => ({ from: date }))
    ),
  ]);

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />

      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
