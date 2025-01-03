import React from 'react';
import { Autocomplete, TextField, Chip, InputAdornment } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { useCombobox } from 'downshift';
import debounce from 'lodash/debounce';

interface SearchWithMaterialUIProps {
    defaultFields: string[];
    filterOptions: string[];
    debounceMs: number;
}

const SearchWithMaterialUI: React.FC<SearchWithMaterialUIProps> = ({
    defaultFields,
    filterOptions,
    debounceMs
}) => {
    const [selectedFields, setSelectedFields] = React.useState<string[]>(defaultFields);
    const [searchValue, setSearchValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);

    const debouncedSearch = React.useCallback(
        debounce((value: string) => {
            setSearchValue(value);
            // Filter suggestions based on input
            const newSuggestions = filterOptions.filter(option => 
                option.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(newSuggestions);
        }, debounceMs),
        [filterOptions]
    );

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <FaSearch className="search-icon" size={16} />
                <Autocomplete
                    multiple
                    freeSolo
                    disableClearable
                    value={selectedFields}
                    options={filterOptions}
                    onChange={(_, newValue) => setSelectedFields(newValue)}
                    renderTags={(value, getTagProps) =>
                        value.map((field, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={field}
                                label={field}
                                variant="outlined"
                                size="small"
                                onDelete={() => {
                                    const newFields = selectedFields.filter(f => f !== field);
                                    setSelectedFields(newFields);
                                }}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search cards..."
                            variant="outlined"
                            fullWidth
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />
                    )}
                />
            </div>
            <div className="inline-suggestion">
                {searchValue && suggestions[0] && (
                    <span className="suggestion-text">
                        {searchValue}
                        <span className="faded-suggestion">
                            {suggestions[0].slice(searchValue.length)}
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default SearchWithMaterialUI;
