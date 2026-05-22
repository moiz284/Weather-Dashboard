import { ValidationError } from "./error";

const COUNTRY_NAME_REGEX = /^[a-zA-Z\s-]+$/;

export function validateCountryName(country: string): string {
  const trimmedCountry = country.trim();

  if (!trimmedCountry) {
    throw new ValidationError("Country name is required");
  }

  if (trimmedCountry.length > 56) {
    throw new ValidationError("Country name is too long");
  }

  if (!COUNTRY_NAME_REGEX.test(trimmedCountry)) {
    throw new ValidationError(
      "Country name must contain only letters, spaces, or hyphens"
    );
  }

  return trimmedCountry;
}

export function validateComparisonInput(
  country1: string,
  country2: string
) {
  const validatedCountry1 = validateCountryName(country1);
  const validatedCountry2 = validateCountryName(country2);

  if (
    validatedCountry1.toLowerCase() ===
    validatedCountry2.toLowerCase()
  ) {
    throw new ValidationError(
      "Please compare two different countries"
    );
  }

  return {
    country1: validatedCountry1,
    country2: validatedCountry2,
  };
}