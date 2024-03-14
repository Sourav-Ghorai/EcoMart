import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  //Initializing context variable
  const [search, setSearch] = useState({
    keyword: "",
    result: []
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

//Custom hook
const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvider };
