import { useEffect, useState, useCallback } from "react";

interface Option {
  name: string;
}

export const useAutoComplete = <T extends Option>(options: T[]) => {
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<T[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<T>();

  const filterSuggestions = useCallback(
    async (input: string): Promise<T[]> => {
      if (!input) return [];

      return new Promise<T[]>((resolve) => {
        setTimeout(() => {
          const filtered = options.filter((option) =>
            option.name.toLowerCase().includes(input.toLowerCase())
          );
          resolve(filtered);
        }, 300);
      });
    },
    [options]
  );

  const fetchFilteredData = useCallback(async () => {
    if (!debouncedInputValue) {
      setFilteredSuggestions([]);
      setIsActive(false);

      return;
    }

    const filteredData = await filterSuggestions(debouncedInputValue);
    setFilteredSuggestions(filteredData);
    setIsActive(filteredData.length > 0);
  }, [debouncedInputValue, filterSuggestions]);

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
  }

  return {
    input,
    filteredSuggestions,
    isActive,
    selectedSuggestion,
    handleInputChange,
    handleSuggestionClick,
    handleDismissSuggestionClick,
  };
};
