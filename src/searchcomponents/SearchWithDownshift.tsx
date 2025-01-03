import React from 'react';
import { useCombobox } from 'downshift';
import { FaSearch } from 'react-icons/fa';
import { Chip } from '@mui/material';
import { Turnstone } from 'turnstone';

interface SearchWithDownshiftProps {
    defaultFields: string[];
    filterOptions: string[];
    debounceMs: number;
}

const SearchWithDownshift: React.FC<SearchWithDownshiftProps> = ({
    defaultFields,
    filterOptions,
    debounceMs
}) => {
    const [selectedFields, setSelectedFields] = React.useState<string[]>(defaultFields);
    const [searchValue, setSearchValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);

    const {
        isOpen,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        items: suggestions,
        onInputValueChange: ({ inputValue }) => {
            setSearchValue(inputValue || '');
        },
        stateReducer: (state, actionAndChanges) => {
            const { changes, type } = actionAndChanges;
            switch (type) {
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    return {
                        ...changes,
                        isOpen: false,
                    }
                default:
                    return changes;
            }
        },
    });

    return (
        <div className="search-container">
            <div className="search-input-wrapper" {...getComboboxProps()}>
                <FaSearch className="search-icon" size={16} />
                <div className="selected-fields">
                    {selectedFields.map((field) => (
                        <Chip
                            key={field}
                            label={field}
                            onDelete={() => {
                                setSelectedFields(fields => fields.filter(f => f !== field));
                            }}
                            variant="outlined"
                            size="small"
                        />
                    ))}
                </div>
                <input
                    {...getInputProps({
                        placeholder: 'Search cards...',
                        className: 'search-input'
                    })}
                />
            </div>
            <div {...getMenuProps()} className="hidden" />
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

export default SearchWithDownshift;
