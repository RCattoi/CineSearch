import { createContext, useState } from 'react';

export const searchBarContext = createContext({});

export const SearchBarProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [searchMethod, setSearchMethod] = useState('load');
  const [currentPage, setCurrentPage] = useState();
  return (
    <searchBarContext.Provider
      value={{
        search,
        setSearch,
        searchMethod,
        setSearchMethod,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </searchBarContext.Provider>
  );
};
