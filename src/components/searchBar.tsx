import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Checkbox } from './ui/checkbox';

interface SearchBarProps {
  placeholder?: string;
  dropdownItems?: string[];
  onSearch: (search: string) => void;
  onFilter?: (filters: string[]) => void;
  suggestions?: string[];
  filterTitle?: string;
  filterItems?: string[];
  debounceDelay?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  dropdownItems = [],
  onSearch,
  onFilter,
  suggestions = [],
  filterTitle = 'Filter',
  filterItems = [],
  debounceDelay = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(dropdownItems[0] || 'All categories');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  // Handle debounced search for email suggestions
  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = searchTerm
        ? suggestions
            .filter((suggestion) => suggestion.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 5)
        : [];
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);

      // Update the search term to the parent component
      onSearch(searchTerm);
    }, debounceDelay);

    // Cleanup the timeout handler
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, suggestions, debounceDelay, onSearch]);

  const handleFilterChange = useCallback(
    (filter: string) => {
      const updatedFilters = new Set(selectedFilters);
      if (selectedFilters.has(filter)) {
        updatedFilters.delete(filter);
      } else {
        updatedFilters.add(filter);
      }
      setSelectedFilters(updatedFilters);
    },
    [selectedFilters]
  );

  const handleCategorySelect = useCallback(
    (category: string) => {
      setSelectedCategory(category);
    },
    []
  );

  const handleApplyFilters = () => {
    if (onFilter) {
      // Combine selected category and filters
      const filters = [selectedCategory, ...Array.from(selectedFilters)];
      onFilter(filters);
    }
    setDropdownVisible(false);
  };

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setSearchTerm(suggestion);
      setShowSuggestions(false);
      onSearch(suggestion);
    },
    [onSearch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (showSuggestions) {
        if (e.key === 'ArrowDown') {
          setSelectedSuggestionIndex((prevIndex) =>
            prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
          );
        } else if (e.key === 'ArrowUp') {
          setSelectedSuggestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
          const selectedSuggestion = filteredSuggestions[selectedSuggestionIndex];
          setSearchTerm(selectedSuggestion);
          setShowSuggestions(false);
          onSearch(selectedSuggestion);
        }
      }
    },
    [showSuggestions, filteredSuggestions, selectedSuggestionIndex, onSearch]
  );

  const dropdownMenu = useMemo(
    () =>
      dropdownVisible && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 z-30">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{filterTitle}</h3>
            {filterItems.map((item) => (
              <div key={item} className="flex items-center mb-2">
                <Checkbox
                  id={item}
                  checked={selectedFilters.has(item)}
                  onCheckedChange={() => handleFilterChange(item)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={item} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </label>
              </div>
            ))}
            <button
              className="mt-4 w-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      ),
    [dropdownVisible, filterItems, filterTitle, selectedFilters, handleFilterChange, handleApplyFilters]
  );

  return (
    <form className="max-w-lg mx-auto relative mt-4" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center relative">
        <button
          id="dropdown-button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          {selectedCategory}
          <svg
            className="w-2.5 h-2.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
        </div>
      </div>
      {dropdownMenu}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto w-full mt-1 z-30">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={`px-4 py-2 cursor-pointer text-black hover:bg-gray-100 ${
                index === selectedSuggestionIndex ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
