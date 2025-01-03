import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Chip } from '@mui/material';

interface SearchWithReactSelectProps {
    defaultFields: string[];
    filterOptions: string[];
    debounceMs: number;
}

const SearchWithReactSelect: React.FC<SearchWithReactSelectProps> = ({
    defaultFields,
    filterOptions,
    debounceMs
}) => {
    const [selectedFields, setSelectedFields] = React.useState<string[]>(defaultFields);
    const [inputValue, setInputValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [suggestionIndex, setSuggestionIndex] = React.useState(0);

    const filterOptionsList = React.useCallback(
        (inputValue: string) => {
            return filterOptions.filter(option =>
                option.toLowerCase().includes(inputValue.toLowerCase())
            );
        },
        [filterOptions]
    );

    const options = React.useMemo(() => 
        filterOptions.map(field => ({
            value: field,
            label: field
        })),
        [filterOptions]
    );

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowLeft' && suggestionIndex > 0) {
            setSuggestionIndex(i => i - 1);
        } else if (event.key === 'ArrowRight' && suggestionIndex < suggestions.length - 1) {
            setSuggestionIndex(i => i + 1);
        }
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper" onKeyDown={handleKeyDown}>
                <div className="search-icon-wrapper">
                    <FaSearch className="search-icon" size={16} />
                </div>
                <CreatableSelect
                    isMulti
                    isClearable
                    isSearchable
                    placeholder="Search cards..."
                    options={options}
                    value={options.filter(opt => selectedFields.includes(opt.value))}
                    inputValue={inputValue}
                    onInputChange={(newValue) => {
                        setInputValue(newValue);
                        const filtered = filterOptions(newValue);
                        setSuggestions(filtered);
                    }}
                    onChange={(newValue) => {
                        setSelectedFields(newValue.map(v => v.value));
                    }}
                    components={{
                        MultiValue: ({ data, removeProps }) => (
                            <Chip
                                label={data.label}
                                onDelete={removeProps.onClick}
                                variant="outlined"
                                size="small"
                            />
                        ),
                        IndicatorSeparator: null
                    }}
                />
                {suggestions.length > 0 && (
                    <div className="inline-suggestion">
                        <FaArrowLeft className="suggestion-arrow" />
                        <span className="suggestion-text">
                            {inputValue}
                            <span className="faded-suggestion">
                                {suggestions[suggestionIndex].slice(inputValue.length)}
                            </span>
                        </span>
                        <FaArrowRight className="suggestion-arrow" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchWithReactSelect;
