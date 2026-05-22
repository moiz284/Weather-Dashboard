import { useState } from "react";
import { compareCountries } from "@/lib/api";
import { ComparisonResponse } from "@/types/api";

export function useCompareCountries() {
  const [data, setData] = useState<ComparisonResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function compare(country1: string, country2: string) {
    try {
      setLoading(true);
      setError(null);

      const result = await compareCountries(country1, country2);

      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    compare,
  };
}