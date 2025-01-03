import React from 'react';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';
import { Chip } from '@mui/material';
import { Turnstone } from 'turnstone';

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
    const [searchValue, setSearchValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);

    const options = filterOptions.map(field => ({
        value: field,
        label: field
    }));

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <FaSearch className="search-icon" size={16} />
                <Select
                    isMulti
                    isClearable
                    isSearchable
                    placeholder="Search cards..."
                    options={options}
                    value={options.filter(opt => selectedFields.includes(opt.value))}
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
                        )
                    }}
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
                onChange={(value) => setSearchValue(value)}
            />
        </div>
    );
};

export default SearchWithReactSelect;
