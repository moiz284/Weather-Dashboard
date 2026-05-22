import { TimeoutError } from "./error";

const DEFAULT_TIMEOUT_MS = 5000;

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new TimeoutError("Request timed out");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}