import { fetchWithTimeout } from "./timeout";
import { ExternalServiceError, NotFoundError } from "./error";
import { WeatherData } from "../types/weather";

const OPENWEATHER_BASE =
  "https://api.openweathermap.org/data/2.5/weather";

const API_KEY = process.env.OPENWEATHER_API_KEY;
console.log(API_KEY)

if (!API_KEY) {
  throw new Error("Missing OPENWEATHER_API_KEY in environment");
}

export async function getWeatherData(
  city: string
): Promise<WeatherData> {
  const url = `${OPENWEATHER_BASE}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;
  console.log(url)

  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError(`Weather not found for ${city}`);
    }

    if (response.status === 401) {
      throw new ExternalServiceError(
        "Invalid weather API key"
      );
    }

    throw new ExternalServiceError(
      "Failed to fetch weather data"
    );
  }

  const data = await response.json();

  if (!data || !data.main) {
    throw new ExternalServiceError(
      "Invalid weather response structure"
    );
  }

  return {
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind?.speed ?? 0,
    condition: data.weather?.[0]?.main ?? "Unknown",
  };
}