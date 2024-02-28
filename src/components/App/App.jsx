import { useState, useEffect } from 'react';
import './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../components/images-api';
import ImageGallery from '../ImageGallery/ImageGallery';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const [images, setImages] = useState([]); //  const [articles, setArticles] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  // X7bmSryaDQ4Zl9buwsMLINezY-hQu2EgXC4tlifkBsM

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function getData() {
      try {
        //     setIsLoading(true);
        //     setError(false);
        const data = await fetchImages(searchQuery, page);
        setImages(prevImages => {
          return [...prevImages, ...data.results];
        });
        //     toast.success('HTTP success!!!! 🐷 ✅ 🎉');
      } catch (error) {
        // setError(true);
      } finally {
        // setIsLoading(false);
      }
    }
    getData();
  }, [page, searchQuery]);

  const handleSearch = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {/* {error && <ErrorMessage />} */}
      {images.length > 0 && <ImageGallery items={images} />}
      {/* {articles.length > 0 && !isLoading && (
        <button onClick={handleLoadMore}>Load more</button>
      )} */}
      {/* {isLoading && (
        <p>
          <b>Loading articles...</b>
        </p>
      )} */}
      {/* <Toaster position="bottom-center" /> */}
    </>
  );
}
