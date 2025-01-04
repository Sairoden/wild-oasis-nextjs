"use client";

// NEXT
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const GUESTS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "1—3 guests",
    value: "small",
  },

  {
    label: "4—7 guests",
    value: "medium",
  },
  {
    label: "8—12 guests",
    value: "large",
  },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="border border-primary-800 flex">
      {GUESTS.map((guest, index) => (
        <Button
          handleFilter={handleFilter}
          activeFilter={activeFilter}
          key={index}
          guest={guest}
        />
      ))}
    </div>
  );
}

interface ButtonProps {
  activeFilter: string;
  handleFilter: (filter: string) => void;
  guest: { label: string; value: string };
}

const Button = ({ handleFilter, activeFilter, guest }: ButtonProps) => {
  return (
    <button
      onClick={() => handleFilter(guest.value)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        guest.value === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {guest.label}
    </button>
  );
};
