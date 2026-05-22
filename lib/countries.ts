import { fetchWithTimeout } from "./timeout";
import { NotFoundError, ExternalServiceError } from "./error";
import { CountryData } from "../types/country";

const REST_COUNTRIES_API =
  "https://restcountries.com/v3.1/name"; // change to env

export async function getCountryData(
  country: string
): Promise<CountryData> {
  const url = `${REST_COUNTRIES_API}/${encodeURIComponent(
    country
  )}?fullText=true`;

  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError(`Country not found: ${country}`);
    }

    throw new ExternalServiceError(
      "Failed to fetch country data"
    );
  }

  const data = await response.json();

  // REST Countries returns an array
  const countryInfo = data?.[0];

  if (!countryInfo) {
    throw new NotFoundError(`Country not found: ${country}`);
  }

  const currencies = countryInfo.currencies
    ? Object.values(countryInfo.currencies).map(
        (c: any) => c.name
      )
    : [];

  const languages = countryInfo.languages
    ? Object.values(countryInfo.languages)
    : [];

  const timezones = countryInfo.timezones ?? [];

  return {
    name: countryInfo.name?.common ?? country,
    capital: countryInfo.capital?.[0] ?? "Unknown",
    population: countryInfo.population ?? 0,
    region: countryInfo.region ?? "Unknown",
    currency: currencies[0] ?? "Unknown",
    languages:countryInfo.languages?? "UnKnown",
    timezone: timezones[0] ?? "Unknown",
  };
}