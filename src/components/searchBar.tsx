'use client';
import React, { useState, useMemo, useEffect, KeyboardEvent } from 'react';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Define the props for the SearchBar component
interface SearchBarProps {
  onSearch: (query: string) => void; // Function to call when a search is triggered
  suggestions: string[]; // List of suggestions for the search input
}

const SearchBarDebounce: React.FC<SearchBarProps> = ({ onSearch, suggestions }) => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // State to store the search input
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]); // State to store filtered suggestions
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false); // State to control suggestions visibility
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1); // State to keep track of the active suggestion index

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update the search query state
    setShowSuggestions(true); // Show suggestions when user types
  };

  // Memoized debounced search function to optimize performance
  const debouncedSearch = useMemo(() => {
    return debounce((query: string) => {
      onSearch(query); // Call onSearch with the current query after debounce delay
    }, 300); // 300ms delay
  }, [onSearch]);

  // Effect to filter suggestions and debounce search execution
  useEffect(() => {
    if (searchQuery) {
      // Filter suggestions based on the search query
      const filtered = suggestions
        .filter((suggestion) => suggestion && suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5); // Limit to 5 suggestions
      setFilteredSuggestions(filtered); // Update filtered suggestions state
      debouncedSearch(searchQuery); // Trigger debounced search
    } else {
      setFilteredSuggestions([]); // Clear suggestions if search query is empty
    }

    return () => {
      debouncedSearch.cancel(); // Cleanup debounce on unmount or state change
    };
  }, [searchQuery, debouncedSearch, suggestions]);

  // Handle search submission
  const handleSearchSubmit = () => {
    if (activeSuggestion >= 0 && activeSuggestion < filteredSuggestions.length) {
      // If an active suggestion is selected, use it as the query
      setSearchQuery(filteredSuggestions[activeSuggestion]);
      onSearch(filteredSuggestions[activeSuggestion]);
    } else {
      // Otherwise, use the current search query
      onSearch(searchQuery);
    }
    setShowSuggestions(false); // Hide suggestions after submission
    setActiveSuggestion(-1); // Reset active suggestion
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion); // Set search query to clicked suggestion
    onSearch(suggestion); // Trigger search with the selected suggestion
    setShowSuggestions(false); // Hide suggestions after click
    setActiveSuggestion(-1); // Reset active suggestion
  };

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(); // Submit search on Enter key
    } else if (e.key === 'ArrowDown') {
      // Navigate down in suggestions
      setActiveSuggestion((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      // Navigate up in suggestions
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  // Render the search bar component
  return (
    <div className="relative w-full max-w-2xl">
      <Input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="pr-10 w-full"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute bg-white border-white w-full mt-1 max-h-60 overflow-y-auto z-10 rounded-sm">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 hover:bg-slate-100 hover:border-2 hover:text-primary hover:border-primary hover:rounded-sm ${
                activeSuggestion === index ? 'bg-slate-100 border-2 text-primary border-primary rounded-sm' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <Button
        onClick={handleSearchSubmit}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
        variant="ghost"
        size="icon"
      >
        <Search className="h-5 w-5 text-gray-500" />
      </Button>
    </div>
  );
};

export default SearchBarDebounce;
