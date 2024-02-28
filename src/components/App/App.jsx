import { useState } from 'react';
import './App.module.css';
import SearchBar from '../SearchBar/SearchBar';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [page, setPage] = useState(1);
  // const [articles, setArticles] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  const handleSearch = newQuery => {
    setSearchQuery(newQuery);
    // setPage(1);
    setArticles([]);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
    </>
  );
}
