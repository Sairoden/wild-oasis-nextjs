// TYPES
import { Booking } from "@/types";

// COMPONENTS
import { ReservationCard } from "./index";

export default function ReservationList({ bookings }: { bookings: Booking[] }) {
  return (
    <ul className="space-y-6">
      {bookings.map((booking: Booking) => (
        <ReservationCard booking={booking} key={booking.id} />
      ))}
    </ul>
  );
}
