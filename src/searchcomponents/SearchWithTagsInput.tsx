import React from 'react';
import TagsInput from 'react-tagsinput';
import { FaSearch } from 'react-icons/fa';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-tagsinput/react-tagsinput.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

interface SearchWithTagsInputProps {
    defaultFields: string[];
    filterOptions: string[];
    debounceMs: number;
}

const SearchWithTagsInput: React.FC<SearchWithTagsInputProps> = ({
    defaultFields,
    filterOptions,
    debounceMs
}) => {
    const [selectedFields, setSelectedFields] = React.useState<string[]>(defaultFields);
    const [searchValue, setSearchValue] = React.useState('');
    const [focused, setFocused] = React.useState(false);

    const handleTagChange = (tags: string[]) => {
        setSelectedFields(tags);
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <FaSearch className="search-icon" size={16} />
                <TagsInput
                    value={selectedFields}
                    onChange={handleTagChange}
                    onlyUnique
                    addOnBlur
                    addKeys={[9, 13]} // Tab and Enter
                    inputProps={{
                        placeholder: 'Search cards...',
                        className: 'tags-input',
                        onFocus: () => setFocused(true),
                        onBlur: () => setFocused(false)
                    }}
                    tagProps={{
                        className: 'search-tag',
                        classNameRemove: 'search-tag-remove'
                    }}
                />
            </div>
            {focused && (
                <div className="filter-options">
                    <Typeahead
                        id="typeahead"
                        options={filterOptions}
                        selected={[]}
                        onChange={(selected) => {
                            if (selected.length > 0) {
                                setSelectedFields([...selectedFields, selected[0] as string]);
                            }
                        }}
                        minLength={2}
                        highlightOnlyResult
                        renderMenuItemChildren={(option) => (
                            <span className="suggestion-text">{option as string}</span>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchWithTagsInput;
