import { CountryComparison } from "@/types/api";
import {
  formatPopulation,
  formatTemperature,
  formatHumidity,
  formatWindSpeed,
} from "../../../../../lib/formatter";

interface Props {
  data: CountryComparison[];
}

function getWeatherIcon(condition?: string) {
  if (!condition) return "🌍";

  const normalized = condition.toLowerCase();

  if (normalized.includes("clear")) return "☀️";
  if (normalized.includes("cloud")) return "☁️";
  if (normalized.includes("rain")) return "🌧️";
  if (normalized.includes("snow")) return "❄️";
  if (normalized.includes("storm")) return "⛈️";

  return "🌍";
}

export default function ComparisonCards({ data }: Props) {
  if (!data || data.length < 2) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold">{item.country.name}</h2>

              <p className="text-gray-500 mt-1">{item.country.region}</p>
            </div>

            <div className="text-5xl">
              {getWeatherIcon(item.weather?.condition)}
            </div>
          </div>

          <div className="space-y-4">
            <Metric label="Capital" value={item.country.capital} />
            <Metric
              label="Population"
              value={formatPopulation(item.country.population)}
            />
            <Metric label="Currency" value={item.country.currency} />

            <Metric label="Timezone" value={item.country.timezone} />
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Weather Conditions</h3>
            {item.weather ? (
              <div className="grid grid-cols-2 gap-4">
                <WeatherBox
                  label="Temperature"
                  value={formatTemperature(item.weather.temperature)}
                />

                <WeatherBox
                  label="Humidity"
                  value={formatHumidity(item.weather.humidity)}
                />

                <WeatherBox
                  label="Wind"
                  value={formatWindSpeed(item.weather.windSpeed)}
                />

                <WeatherBox label="Condition" value={item.weather.condition} />
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
                Weather data unavailable.
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function WeatherBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border">
      <div className="text-sm text-gray-500 mb-1">{label}</div>

      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
