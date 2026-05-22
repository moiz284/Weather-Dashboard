import { NextResponse } from "next/server";

import { validateComparisonInput } from "@/lib/validators";
import { getCountryData } from "@/lib/countries";
import { getWeatherData } from "@/lib/weather";
import { generateInsights } from "@/lib/insights";
import { ApiErrorResponse } from "@/types/api";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const country1 = searchParams.get("country1") || "";
    const country2 = searchParams.get("country2") || "";

    // 1. Validate input
    const validated = validateComparisonInput(country1, country2);

    // 2. Fetch countries in parallel
    const [c1, c2] = await Promise.all([
      getCountryData(validated.country1),
      getCountryData(validated.country2),
    ]);

    // 3. Fetch weather in parallel (can partially fail)
    const weatherResults = await Promise.allSettled([
      getWeatherData(c1.capital),
      getWeatherData(c2.capital),
    ]);
    console.log(weatherResults)

    const weather1 =
      weatherResults[0].status === "fulfilled"
        ? weatherResults[0].value
        : null;

    const weather2 =
      weatherResults[1].status === "fulfilled"
        ? weatherResults[1].value
        : null;

    // 4. Generate insights (works even with null weather)
    const insights = generateInsights(
      { country: c1, weather: weather1 },
      { country: c2, weather: weather2 }
    );

    // 5. Build response
    return NextResponse.json({
      comparison: [
        {
          country: c1,
          weather: weather1,
        },
        {
          country: c2,
          weather: weather2,
        },
      ],
      insights,
      warnings: buildWarnings(weather1, weather2),
    });
  } catch (err: any) {
    const response: ApiErrorResponse = {
      message: err.message || "Internal Server Error",
      status: err.statusCode || 500,
    };

    return NextResponse.json(response, {
      status: response.status,
    });
  }
}

// helper for partial failures
function buildWarnings(weather1: any, weather2: any): string[] {
  const warnings: string[] = [];

  if (!weather1) warnings.push("Weather unavailable for first country");
  if (!weather2) warnings.push("Weather unavailable for second country");

  return warnings;
}