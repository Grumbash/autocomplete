import { Pokemon } from "../types";

export type AutocompleteProps = {
  suggestions: Pokemon[];
};

export const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions }) => {
  return (
    <div>
      <input type="text" />
      <ul>
        {suggestions.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};
