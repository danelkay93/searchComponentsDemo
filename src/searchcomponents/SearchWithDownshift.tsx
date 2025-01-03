import React from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Chip } from '@mui/material';
import debounce from 'lodash/debounce';

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
    const [inputValue, setInputValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [suggestionIndex, setSuggestionIndex] = React.useState(0);

    const {
        getSelectedItemProps,
        getDropdownProps,
        addSelectedItem,
        removeSelectedItem,
        selectedItems
    } = useMultipleSelection({
        initialSelectedItems: defaultFields,
        onSelectedItemsChange: changes => {
            setSelectedFields(changes.selectedItems || []);
        }
    });

    const debouncedGetSuggestions = React.useCallback(
        debounce((value: string) => {
            const filtered = filterOptions.filter(option =>
                option.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        }, debounceMs),
        [filterOptions]
    );

    const {
        isOpen,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        getItemProps,
    } = useCombobox({
        inputValue,
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
                    {selectedItems.map((field, index) => (
                        <Chip
                            {...getSelectedItemProps({ selectedItem: field, index })}
                            key={field}
                            label={field}
                            onDelete={() => removeSelectedItem(field)}
                            variant="outlined"
                            size="small"
                        />
                    ))}
                    <input
                        {...getInputProps(
                            getDropdownProps({
                                placeholder: 'Search cards...',
                                className: 'search-input',
                                onChange: e => {
                                    setInputValue(e.target.value);
                                    debouncedGetSuggestions(e.target.value);
                                },
                                onKeyDown: e => {
                                    if (e.key === 'ArrowLeft' && suggestionIndex > 0) {
                                        setSuggestionIndex(i => i - 1);
                                    } else if (e.key === 'ArrowRight' && suggestionIndex < suggestions.length - 1) {
                                        setSuggestionIndex(i => i + 1);
                                    }
                                }
                            })
                        )}
                    />
                </div>
            </div>
            <div {...getMenuProps()} className="hidden" />
            {suggestions.length > 0 && inputValue && (
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
    );
};

export default SearchWithDownshift;
