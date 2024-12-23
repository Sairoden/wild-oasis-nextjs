// TYPES
import { Cabin } from "@/types";

export interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  numNights: string;
  totalPrice: number;
  numGuests: number;
  created_at: string;
  cabins: Cabin;
}
