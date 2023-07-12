import {createContext, Dispatch, SetStateAction} from 'react';

export const SearchContext = createContext({
    searchTerm: '',
    setSearchTerm: (() => {}) as Dispatch<SetStateAction<string>>,
});
