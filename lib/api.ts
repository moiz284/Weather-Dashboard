import { ComparisonResponse } from "@/types/api";

export async function compareCountries(
  country1: string,
  country2: string
): Promise<ComparisonResponse> {
  const res = await fetch(
    `/api/compare?country1=${encodeURIComponent(
      country1
    )}&country2=${encodeURIComponent(country2)}`
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}