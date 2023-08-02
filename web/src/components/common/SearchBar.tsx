import MagnifyingGlassIcon from '@heroicons/react/20/solid/MagnifyingGlassIcon';
import React, {useState, useRef, useEffect} from 'react';

interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChange}) => {
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={searchRef}
            className="relative flex items-center w-full max-w-sm lg:max-w-lg">
            <MagnifyingGlassIcon
                className={`h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2 ${
                    isFocused ? 'hidden' : ''
                }`}
                aria-hidden="true"
            />
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={e => onChange(e.target.value)}
                className={`w-full block rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6`}
            />
        </div>
    );
};

export default SearchBar;
