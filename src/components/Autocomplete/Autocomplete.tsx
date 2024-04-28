import { Pokemon } from "../../types";
import { useAutoComplete } from "../../hooks";
import { HighlightText } from "../HighlightText";

import styles from "./style.module.css";

export type AutocompleteProps = {
  suggestions: Pokemon[];
};

export const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions }) => {
  const {
    input,
    isActive,
    filteredSuggestions,
    selectedSuggestion,
    handleInputChange,
    handleSuggestionClick,
    handleDismissSuggestionClick,
  } = useAutoComplete(suggestions);

  return (
    <div className={styles.autocompleteContainer}>
      <div className={styles.autocompleteInputWrapper}>
        <input
          type="text"
          onChange={handleInputChange}
          value={input}
          className={styles.autocompleteInput}
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
        <ul className={styles.autocompleteSuggestions}>
          {filteredSuggestions.map((pokemon) => (
            <li key={pokemon.name} className={styles.suggestionItem}>
              <button onClick={handleSuggestionClick(pokemon)}>
                <HighlightText text={pokemon.name} highlight={input} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
