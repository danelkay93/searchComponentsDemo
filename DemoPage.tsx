import React from 'react';
import ReactDOM from 'react-dom';
import SearchWithDownshift from './SearchWithDownshift';
import SearchWithTagsInput from './SearchWithTagsInput';

const DemoPage: React.FC = () => {
    return (
        <div>
            <h2>Search With Downshift</h2>
            <SearchWithDownshift 
                useSearchIcon={true} 
                enableChips={true} 
                debounce={300} 
            />
            <hr />
            <h2>Search With Tags Input</h2>
            <SearchWithTagsInput 
                useSearchIcon={true} 
                enableChips={true} 
                debounce={300} 
            />
        </div>
    );
};

ReactDOM.render(<DemoPage />, document.getElementById('root'));
