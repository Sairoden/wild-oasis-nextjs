// LIB
import { getCountries } from "@/lib/data-service";

interface SelectCountryProps {
  defaultCountry?: string;
  name?: string;
  id?: string;
  className?: string;
}

interface Country {
  name: string;
  flag: string;
}

export default async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps) {
  const countries = await getCountries();
  const country = countries.find(
    (country: Country) => country?.name === defaultCountry
  );
  const flag = country?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>

      {countries.map((country: Country) => (
        <option key={country.name} value={`${country.name}%${country.flag}`}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
