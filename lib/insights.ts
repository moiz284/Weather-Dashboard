import { CountryData } from "../types/country";
import { WeatherData } from "../types/weather";

interface Input {
  country: CountryData;
  weather: WeatherData | null;
}

export function generateInsights(
  a: Input,
  b: Input
): string[] {
  const insights: string[] = [];

  // --- Temperature comparison ---
  if (a.weather && b.weather) {
    const tempDiff = Math.abs(
      a.weather.temperature - b.weather.temperature
    );

    if (a.weather.temperature > b.weather.temperature) {
      insights.push(
        `${a.country.name} is warmer than ${b.country.name} by ${tempDiff.toFixed(
          1
        )}°C`
      );
    } else if (b.weather.temperature > a.weather.temperature) {
      insights.push(
        `${b.country.name} is warmer than ${a.country.name} by ${tempDiff.toFixed(
          1
        )}°C`
      );
    }

    // Humidity comparison
    if (a.weather.humidity > b.weather.humidity) {
      insights.push(
        `${a.country.name} is more humid than ${b.country.name}`
      );
    } else if (b.weather.humidity > a.weather.humidity) {
      insights.push(
        `${b.country.name} is more humid than ${a.country.name}`
      );
    }

    // Outdoor condition heuristic
    const aScore = scoreWeather(a.weather);
    const bScore = scoreWeather(b.weather);

    if (aScore > bScore) {
      insights.push(
        `${a.country.name} currently has better outdoor conditions`
      );
    } else if (bScore > aScore) {
      insights.push(
        `${b.country.name} currently has better outdoor conditions`
      );
    }
  }

  // --- Extreme condition checks ---
  if (a.weather) {
    if (a.weather.temperature > 40) {
      insights.push(
        `Extreme heat conditions detected in ${a.country.name}`
      );
    }
  }

  if (b.weather) {
    if (b.weather.temperature > 40) {
      insights.push(
        `Extreme heat conditions detected in ${b.country.name}`
      );
    }
  }

  return insights;
}

// Simple heuristic scoring model
function scoreWeather(weather: WeatherData): number {
  let score = 0;

  // Comfortable temperature range
  if (weather.temperature >= 18 && weather.temperature <= 28) {
    score += 3;
  } else if (
    weather.temperature >= 10 &&
    weather.temperature <= 35
  ) {
    score += 1;
  }

  // Lower humidity is better for comfort
  if (weather.humidity < 50) {
    score += 2;
  } else if (weather.humidity < 70) {
    score += 1;
  }

  // Wind penalty (very high wind reduces comfort)
  if (weather.windSpeed < 10) {
    score += 1;
  }

  return score;
}