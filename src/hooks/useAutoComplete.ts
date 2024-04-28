import { useEffect, useState, useCallback } from "react";

export type Option = {
  name: string;
};

export type FilterSuggestions = <T extends Option>(
  options: T[],
  input: string
) => Promise<T[]>;

export const useAutoComplete = <T extends Option>(
  options: T[],
  filterSuggestions: FilterSuggestions
) => {
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<T[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<T>();
  const [error, setError] = useState<string | null>(null);

  const fetchFilteredData = useCallback(async () => {
    if (!debouncedInputValue) {
      setFilteredSuggestions([]);
      setIsActive(false);
      setError(null);
      return;
    }

    try {
      const filteredData = await filterSuggestions(options, debouncedInputValue);
      setError(null); // Clear any previous errors

      if (!filteredData.length) {
        setFilteredSuggestions([{ name: "Nothing Found" } as T]);
      } else {
        setFilteredSuggestions(filteredData);
      }

      setIsActive(true);
    } catch (err) {
      setError("An error occurred while filtering suggestions.");
      setFilteredSuggestions([]);
      setIsActive(false);
    }
  }, [debouncedInputValue, filterSuggestions, options]);

  useEffect(() => {
    fetchFilteredData();
  }, [debouncedInputValue, fetchFilteredData]);

  useEffect(() => {
    if (selectedSuggestion) return;
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(input);
    }, 500);

    return () => clearTimeout(delayInputTimeoutId);
  }, [input, selectedSuggestion]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSuggestionClick = (value: T) => () => {
    setSelectedSuggestion(value);
    setInput(value.name);
    setFilteredSuggestions([]);
    setIsActive(false);
  };

  const handleDismissSuggestionClick = () => {
    setInput("");
    setFilteredSuggestions([]);
    setIsActive(false);
    setSelectedSuggestion(undefined);
  };

  return {
    input,
    filteredSuggestions,
    isActive,
    selectedSuggestion,
    error,
    handleInputChange,
    handleSuggestionClick,
    handleDismissSuggestionClick,
  };
};
