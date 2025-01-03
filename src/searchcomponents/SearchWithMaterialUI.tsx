import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { Turnstone } from 'turnstone';

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

    // Handle search input changes with debounce
    const handleSearchChange = React.useCallback((value: string) => {
        setSearchValue(value);
        // Implement search logic here
    }, []);

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
                        />
                    )}
                />
            </div>
            <Turnstone
                debounceWait={debounceMs}
                maxItems={10}
                styles={{
                    input: 'search-input',
                    listbox: 'hidden'
                }}
                value={searchValue}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchWithMaterialUI;
