export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`;
}

export function formatHumidity(humidity: number): string {
  return `${Math.round(humidity)}%`;
}

export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`;
}

export function formatPopulation(population: number): string {
  if (population >= 1_000_000_000) {
    return `${(population / 1_000_000_000).toFixed(1)}B`;
  }

  if (population >= 1_000_000) {
    return `${(population / 1_000_000).toFixed(1)}M`;
  }

  if (population >= 1_000) {
    return `${(population / 1_000).toFixed(1)}K`;
  }

  return population.toString();
}

export function capitalize(text: string): string {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}