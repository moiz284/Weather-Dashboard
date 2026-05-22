import { Dispatch, SetStateAction } from "react";

interface Props {
  country1: string;
  country2: string;
  setCountry1: Dispatch<SetStateAction<string>>;
  setCountry2: Dispatch<SetStateAction<string>>;
  onCompare: () => void;
  loading: boolean;
}

export default function SearchBar({
  country1,
  country2,
  setCountry1,
  setCountry2,
  onCompare,
  loading,
}: Props) {
  const isDisabled =
    loading || !country1.trim() || !country2.trim();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={country1}
          onChange={(e) => setCountry1(e.target.value)}
          placeholder="Enter first country"
          className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={country2}
          onChange={(e) => setCountry2(e.target.value)}
          placeholder="Enter second country"
          className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onCompare}
        disabled={isDisabled}
        className={`w-full md:w-auto px-8 py-4 rounded-xl font-medium transition-all ${
          isDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
        }`}
      >
        {loading ? "Comparing Countries..." : "Compare Countries"}
      </button>
    </div>
  );
}