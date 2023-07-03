import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChange}) => {
    return (
        <div className=" bg-gray-700 p-4 sticky top-16 z-30">
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none"
            />
        </div>
    );
};

export default SearchBar;
