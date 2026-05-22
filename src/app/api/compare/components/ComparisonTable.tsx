import { CountryComparison } from "@/types/api";
import {
  formatPopulation,
  capitalize,
} from "../../../../../lib/formatter";

interface Props {
  data: CountryComparison[];
}

export default function ComparisonTable({ data }: Props) {
  if (!data || data.length < 2) return null;

  const [a, b] = data;

  return (
    <div className="border rounded p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Country Comparison
      </h2>

      <table className="w-full border-collapse">
        <tbody>
          <Row
            label="Country"
            a={a.country.name}
            b={b.country.name}
          />
          <Row
            label="Capital"
            a={a.country.capital}
            b={b.country.capital}
          />
          <Row
            label="Population"
            a={formatPopulation(a.country.population)}
            b={formatPopulation(b.country.population)}
          />
          <Row
            label="Region"
            a={capitalize(a.country.region)}
            b={capitalize(b.country.region)}
          />
          <Row
            label="Currency"
            a={a.country.currency}
            b={b.country.currency}
          />

          <Row
            label="Temperature"
            a={
              a.weather
                ? `${Math.round(a.weather.temperature)}°C`
                : "N/A"
            }
            b={
              b.weather
                ? `${Math.round(b.weather.temperature)}°C`
                : "N/A"
            }
          />

          <Row
            label="Humidity"
            a={
              a.weather
                ? `${Math.round(a.weather.humidity)}%`
                : "N/A"
            }
            b={
              b.weather
                ? `${Math.round(b.weather.humidity)}%`
                : "N/A"
            }
          />

          <Row
            label="Wind Speed"
            a={
              a.weather
                ? `${Math.round(a.weather.windSpeed)} km/h`
                : "N/A"
            }
            b={
              b.weather
                ? `${Math.round(b.weather.windSpeed)} km/h`
                : "N/A"
            }
          />

          <Row
            label="Condition"
            a={a.weather?.condition ?? "N/A"}
            b={b.weather?.condition ?? "N/A"}
          />
        </tbody>
      </table>
    </div>
  );
}

// reusable row component
function Row({
  label,
  a,
  b,
}: {
  label: string;
  a: string;
  b: string;
}) {
  return (
    <tr className="border-b">
      <td className="p-2 font-medium">{label}</td>
      <td className="p-2 text-center">{a}</td>
      <td className="p-2 text-center">{b}</td>
    </tr>
  );
}