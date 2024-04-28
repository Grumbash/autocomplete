import { Autocomplete } from "../../components";
import { usePokemons } from "../../hooks";

import styles from "./style.module.css";

export const Main = () => {
  const pokemons = usePokemons();
  
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Find your pokemon!</h1>
      <Autocomplete suggestions={pokemons} />
    </main>
  );
};
