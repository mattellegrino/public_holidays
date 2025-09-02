'use client'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Country } from "../models/country";
import { useEffect, useState } from "react";
import { Holiday } from "../models/holiday";
import Link from "next/link";


export default function PublicHolidays() {

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
        <Link href="/" className="absolute top-6 left-6 flex items-center group">
            <svg
            className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Go Home</span>
        </Link>
        <label className="text-lg font-light"htmlFor="country-select">Select a country:</label>
        <select id="country-select" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          {countries.map((country: Country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name[0].text}
            </option>
          ))}
        </select>
        <div className="grid gap-4 mt-6 p-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start">
          {holidays.map((holiday: Holiday) => (
          <div
            className="border rounded-lg p-4 shadow-sm flex flex-col items-center bg-white/50"
            key={holiday.id}
          >
          <h3 className="font-semibold text-lg mb-2">{formatDate(holiday.startDate)}</h3>
          <p className="text-gray-700">{holiday.name[0].text}</p>
          </div>
        ))}
        </div>
      </div>
    );
  };



  return (
    <div className="flex-column align-center justify-center text-center">
      <div className="p-8">
        <span className="text-5xl font-bold">Find your holidays!</span>
      </div>
      <QueryClientProvider client={queryClient}>
        <CountryList />
      </QueryClientProvider>
    </div>
    
  )
}