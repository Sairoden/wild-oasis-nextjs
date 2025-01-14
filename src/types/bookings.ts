export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: string;
  numGuests: number;
  totalPrice: number;
  cabinId: number;
}
