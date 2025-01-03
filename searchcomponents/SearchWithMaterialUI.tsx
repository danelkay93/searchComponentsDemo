import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { Turnstone } from 'turnstone';
import componentOptions from '../componentoptions/SearchWithMaterialUI.json';
import cards from '../cards.json';

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

    const {
        materialUIAutocomplete,
        reactIcons,
        materialUiChip,
        turnstone
    } = componentOptions;

    // Handle search input changes with debounce
    const handleSearchChange = React.useCallback((value: string) => {
        setSearchValue(value);
        // Implement search logic here
    }, []);

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <FaSearch {...reactIcons} />
                <Autocomplete
                    {...materialUIAutocomplete}
                    value={searchValue}
                    onChange={(_, newValue) => handleSearchChange(newValue || '')}
                    renderTags={(value, getTagProps) =>
                        selectedFields.map((field, index) => (
                            <Chip
                                {...materialUiChip}
                                {...getTagProps({ index })}
                                label={field}
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
                {...turnstone}
                value={searchValue}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchWithMaterialUI;
