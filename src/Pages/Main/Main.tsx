import { Autocomplete } from "../../components";
import { FilterSuggestions, usePokemons } from "../../hooks";

import styles from "./style.module.css";

import { Pokemon } from "../../types";

export const Main = () => {
  const { pokemons, loading, error, getFilteredPokemons } = usePokemons();

  if (loading) return <div>Loading Pokemons...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Find your pokemon!</h1>
      <Autocomplete<Pokemon> suggestions={pokemons} filter={getFilteredPokemons as FilterSuggestions} />
    </main>
  );
};
