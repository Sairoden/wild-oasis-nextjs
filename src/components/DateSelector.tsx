"use client";

// LIBRARIES
import { DayPicker } from "react-day-picker";

// CONTEXT
import { useReservationContext } from "@/context";

// STYLES
import "react-day-picker/dist/style.css";

interface DateSelectorProps {
  bookedDates: Date[];
  settings: {
    minBookingsLength: number;
    maxBookingsLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
  };
}

export default function DateSelector({ settings }: DateSelectorProps) {
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  const { minBookingsLength, maxBookingsLength } = settings;

  const { range, handleResetRange, handleSelectRange } =
    useReservationContext();

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingsLength + 1}
        max={maxBookingsLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        onSelect={handleSelectRange}
        selected={range}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}0</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}

            <span>/night</span>
          </p>

          {numNights && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          )}
        </div>

        {(range?.from || range?.to) && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={handleResetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
