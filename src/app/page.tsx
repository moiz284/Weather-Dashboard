"use client";

import { useState } from "react";
import { useCompareCountries } from "./api/compare/hooks/useCompareCountries";

import SearchBar from "./api/compare/components/SearchBar";
import ComparisonTable from "./api/compare/components/ComparisonTable";
import InsightPanel from "./api/compare/components/InsightsPanel";
import ErrorBanner from "./api/compare/components/ErrorBanner";
import LoadingState from "./api/compare/components/LoadingState";
import ComparisonCards from "./api/compare/components/ComparisonCard";

export default function Page() {
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");

  const { data, loading, error, compare } =
    useCompareCountries();

  const handleCompare = () => {
    compare(country1, country2);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">
            Country Intelligence Dashboard
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Compare countries using geographic and environmental
            intelligence in one unified dashboard.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <SearchBar
            country1={country1}
            country2={country2}
            setCountry1={setCountry1}
            setCountry2={setCountry2}
            onCompare={handleCompare}
            loading={loading}
          />
        </div>

        {error && <ErrorBanner message={error} />}

        {loading && <LoadingState />}

        {data && (
          <div className="space-y-8">
            <ComparisonCards data={data.comparison} />

            {data.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-2xl shadow-sm">
                <h2 className="font-semibold mb-2">
                  Warnings
                </h2>

                <ul className="list-disc list-inside space-y-1">
                  {data.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            <InsightPanel insights={data.insights} />
          </div>
        )}
      </div>
    </main>
  );
}
