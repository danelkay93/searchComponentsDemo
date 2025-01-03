import React from 'react';
import Autosuggest from 'react-autosuggest';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Badge } from '@mui/material';
import Turnstone from 'turnstone';

interface SearchWithAutosuggestProps {
    defaultFields: string[];
    filterOptions: string[];
    debounceMs: number;
}

const SearchWithAutosuggest: React.FC<SearchWithAutosuggestProps> = ({
    defaultFields,
    filterOptions,
    debounceMs
}) => {
    const [selectedFields, setSelectedFields] = React.useState<string[]>(defaultFields);
    const [value, setValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);

    const handleTurnstoneChange = (value: string) => {
        setValue(value);
        if (value.length > 0) {
            const matches = filterOptions.filter(option =>
                option.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    };

    const [suggestionIndex, setSuggestionIndex] = React.useState(0);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowLeft' && suggestionIndex > 0) {
            setSuggestionIndex(i => i - 1);
        } else if (event.key === 'ArrowRight' && suggestionIndex < suggestions.length - 1) {
            setSuggestionIndex(i => i + 1);
        }
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <FaSearch className="search-icon" size={16} />
                {selectedFields.map(field => (
                    <Badge
                        key={field}
                        badgeContent="×"
                        color="default"
                        onClick={() => setSelectedFields(fields => fields.filter(f => f !== field))}
                    >
                        <span className="field-badge">{field}</span>
                    </Badge>
                ))}
                <div className="turnstone-wrapper" onKeyDown={handleKeyDown}>
                    <Turnstone
                        id="search"
                        value={value}
                        onChange={handleTurnstoneChange}
                        debounceWait={debounceMs}
                        placeholder="Search cards..."
                        styles={{
                            input: 'turnstone-input',
                            listbox: 'hidden'
                        }}
                        listbox={{
                            displayField: 'label',
                            data: filterOptions.map(opt => ({ label: opt }))
                        }}
                    />
                    {suggestions.length > 0 && value && (
                        <div className="inline-suggestion">
                            <FaArrowLeft className="suggestion-arrow" />
                            <span className="suggestion-text">
                                {value}
                                <span className="faded-suggestion">
                                    {suggestions[suggestionIndex].slice(value.length)}
                                </span>
                            </span>
                            <FaArrowRight className="suggestion-arrow" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchWithAutosuggest;
