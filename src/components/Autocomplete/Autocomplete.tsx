import { useAutoComplete, type Option, type FilterSuggestions } from "../../hooks";
import { HighlightText } from "../HighlightText";

import styles from "./style.module.css";

export type AutocompleteProps<T extends Option> = {
  suggestions: T[];
  filter: FilterSuggestions;
};

export function Autocomplete <T extends Option>({ suggestions, filter }: AutocompleteProps<T>) {
  const {
    input,
    isActive,
    filteredSuggestions,
    selectedSuggestion,
    error,
    handleInputChange,
    handleSuggestionClick,
    handleDismissSuggestionClick,
  } = useAutoComplete(suggestions, filter);

  return (
    <div className={styles.autocompleteContainer}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.autocompleteInputWrapper}>
        <input
          type="text"
          onChange={handleInputChange}
          value={input}
          className={styles.autocompleteInput}
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
        />
        {selectedSuggestion && (
          <button
            className={styles.dismissButton}
            onClick={handleDismissSuggestionClick}
          >
            X
          </button>
        )}
      </div>
      {isActive && (
        <ul className={styles.autocompleteSuggestions} role="listbox">
          {filteredSuggestions.map((pokemon) => (
            <li key={pokemon.name} role="option">
              {pokemon.name === "Nothing Found" ? (
                <span className={styles.notFound}>{pokemon.name}</span>
              ) : (
              <button onClick={handleSuggestionClick(pokemon)} className={styles.suggestionItem}>
                <HighlightText text={pokemon.name} highlight={input} />
              </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
