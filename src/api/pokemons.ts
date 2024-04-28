import { Pokemon } from "../types";
import { fetchWithCache } from "../utils";

type FetchOptions = {
  limit?: number;
  offset?: number;
};

export const getPokemons = async ({
  limit = 1500,
  offset = 0,
}: FetchOptions = {}): Promise<Pokemon[]> => {
  const key = `pokemon_limit=${limit}_offset=${offset}`;
  const url = `${
    import.meta.env.VITE_API_URL
  }/pokemon?limit=${limit}&offset=${offset}`;

  const fetcher = async (): Promise<Pokemon[]> => {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Unexpected API response format");
    }
    return data.results as Pokemon[];
  };

  return fetchWithCache(key, fetcher);
};
