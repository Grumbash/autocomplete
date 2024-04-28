import { Autocomplete } from "../components";
import { usePokemons } from "../hooks";

export const Main = () => {
  const pokemons = usePokemons();
  
  return (
    <>
      <Autocomplete suggestions={pokemons} />
    </>
  );
};
