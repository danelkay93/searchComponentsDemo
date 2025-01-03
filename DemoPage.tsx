import React from 'react';
import ReactDOM from 'react-dom';
import searchConfig from './searchConfig.json';

// Dynamically import all search components
const searchComponents = import.meta.glob('./searchcomponents/*.tsx');

interface SearchComponentProps {
    defaultFields: string[];
    filterOptions: string[];
    debounceMs: number;
}

const DemoPage: React.FC = () => {
    const [components, setComponents] = React.useState<{
        [key: string]: React.ComponentType<SearchComponentProps>
    }>({});

    React.useEffect(() => {
        // Load all search components
        Promise.all(
            Object.entries(searchComponents).map(async ([path, importFn]) => {
                const component = await importFn();
                const name = path.split('/').pop()?.replace('.tsx', '') || '';
                return [name, component.default];
            })
        ).then(loadedComponents => {
            setComponents(Object.fromEntries(loadedComponents));
        });
    }, []);

    return (
        <div className="demo-page">
            <h1>Search Component Demo</h1>
            {Object.entries(components).map(([name, Component]) => (
                <div key={name} className="component-section">
                    <h2>{name.replace(/([A-Z])/g, ' $1').trim()}</h2>
                    <Component 
                        defaultFields={searchConfig.defaultFields}
                        filterOptions={searchConfig.filterOptions}
                        debounceMs={searchConfig.debounceMs}
                    />
                    <hr />
                </div>
            ))}
        </div>
    );
};

ReactDOM.render(<DemoPage />, document.getElementById('root'));
