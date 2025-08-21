'use client'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Country } from "./models/country";
import { useEffect, useState } from "react";
import { Holiday } from "./models/holiday";


export default function Home() {

  const queryClient = new QueryClient();
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const CountryList = () => {

    const [selectedCountry, setSelectedCountry] = useState("");

    const { isLoading, error, data: dataCountries } = useQuery({
    queryKey: ["fetchCountries"],
    queryFn: () =>
      fetch('https://openholidaysapi.org/countries').then((res) =>
        res.json()
      ),
    });
    const countries = dataCountries|| [];

    const publicURL = new URL('https://openholidaysapi.org/PublicHolidays');
    publicURL.searchParams.append('countryIsoCode', selectedCountry);
    publicURL.searchParams.append('validFrom', '2023-01-01');
    publicURL.searchParams.append('validTo', '2023-12-31');

    const { data: dataHolidays } = useQuery({
      queryKey: ["fetchHolidays", selectedCountry],
      queryFn: () =>
        fetch(publicURL).then((res) =>
          res.json()
        ),
      enabled: !!selectedCountry
    });
    const holidays = dataHolidays || [];

    useEffect(() => {
      if (countries.length > 0) {
        setSelectedCountry("NL");
      }
    }, [countries]);


    return (
      <div className="flex-column align-center justify-center">
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          {countries.map((country: Country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name[0].text}
            </option>
          ))}
        </select>
        <div>
          {holidays.map((holiday: Holiday) => (
            <div className="flex" key={holiday.id}>
              <h3>{formatDate(holiday.startDate)}</h3>-
              <p>{holiday.name[0].text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };



  return (
    <QueryClientProvider client={queryClient}>
      <CountryList />
    </QueryClientProvider>
  )
}
