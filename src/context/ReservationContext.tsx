"use client";

import { ReactNode, createContext, useContext, useState } from "react";

// LIBRARIES
import { DateRange } from "react-day-picker";

const INITIAL_RANGE: DateRange = { from: undefined, to: undefined };

const ReservationContext = createContext<{
  range: DateRange;
  handleResetRange: () => void;
  handleSelectRange: (range: DateRange | undefined) => void;
}>({
  range: INITIAL_RANGE,
  handleResetRange: () => {},
  handleSelectRange: () => {},
});

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange>(INITIAL_RANGE);

  const handleResetRange = () => setRange(INITIAL_RANGE);

  const handleSelectRange = (range: DateRange | undefined) => {
    if (range) {
      setRange(range);
    }
  };

  const value = { range, handleResetRange, handleSelectRange };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservationContext = () => useContext(ReservationContext);
