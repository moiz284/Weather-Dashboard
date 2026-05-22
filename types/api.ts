import { CountryData } from "./country";
import { WeatherData } from "./weather";

export interface CountryComparison {
  country: CountryData;
  weather: WeatherData | null;
}

export interface ComparisonResponse {
  comparison: CountryComparison[];
  insights: string[];
  warnings: string[];
}

export interface ApiErrorResponse {
  message: string;
  status: number;
}