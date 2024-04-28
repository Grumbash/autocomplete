import { useEffect, useState } from "react";
import { getFilteredPokemons, getPokemons } from "../api";
import { Pokemon } from "../types";

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPokemons()
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch Pokemons. Please try again later.");
        console.error(error);
        setLoading(false);
      });
  }, []);

  return { pokemons, getFilteredPokemons, loading, error };
};
