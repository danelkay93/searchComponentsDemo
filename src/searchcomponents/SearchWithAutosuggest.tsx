import React from 'react';
import Autosuggest from 'react-autosuggest';
import { FaSearch } from 'react-icons/fa';
import { Badge } from '@mui/material';
import debounce from 'lodash/debounce';

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

    const getSuggestions = (inputValue: string) => {
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : filterOptions.filter(option =>
            option.toLowerCase().slice(0, inputLength) === inputValue.toLowerCase()
        );
    };

    const debouncedLoadSuggestions = React.useCallback(
        debounce((value: string) => {
            setSuggestions(getSuggestions(value));
        }, debounceMs),
        []
    );

    const onChange = (_: any, { newValue }: { newValue: string }) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        debouncedLoadSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const renderSuggestion = (suggestion: string) => (
        <div className="suggestion-inline">
            {suggestion}
        </div>
    );

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
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={(suggestion) => suggestion}
                    renderSuggestion={renderSuggestion}
                    inputProps={{
                        placeholder: 'Search cards...',
                        value,
                        onChange,
                        className: 'autosuggest-input'
                    }}
                    theme={{
                        container: 'autosuggest-container',
                        input: 'autosuggest-input',
                        suggestionsContainer: 'suggestions-container',
                        suggestionsList: 'suggestions-list',
                        suggestion: 'suggestion'
                    }}
                />
            </div>
        </div>
    );
};

export default SearchWithAutosuggest;
