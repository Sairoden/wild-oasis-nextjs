"use client";

// LIBRARIES
import { DayPicker, DateRange } from "react-day-picker";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

// CONTEXTS
import { useReservationContext } from "@/context";

// STYLES
import "react-day-picker/dist/style.css";

interface DateSelectorProps {
  bookedDates: DateRange[];
  settings: {
    minBookingsLength: number;
    maxBookingsLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
  };
  cabin: {
    regularPrice: number;
    discount: number;
  };
}

function isAlreadyBooked(range: DateRange, datesArr: DateRange[]) {
  return (
    range.from &&
    range.to &&
    datesArr.some(
      date =>
        (date.from &&
          date.to &&
          isWithinInterval(date.from, {
            start: range.from!,
            end: range.to!,
          })) ||
        (date.from &&
          date.to &&
          isWithinInterval(date.to, { start: range.from!, end: range.to! }))
    )
  );
}

export default function DateSelector({
  settings,
  bookedDates,
  cabin,
}: DateSelectorProps) {
  const { range, handleResetRange, handleSelectRange } =
    useReservationContext();

  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;

  const { regularPrice, discount } = cabin;
  const { minBookingsLength, maxBookingsLength } = settings;
  const numNights =
    range.to && range.from ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

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
        selected={displayRange}
        disabled={curDate =>
          isPast(curDate) ||
          bookedDates.some(
            date =>
              isSameDay(date.from!, curDate) || isSameDay(date.to!, curDate)
          )
        }
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
