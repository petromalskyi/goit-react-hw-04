import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../components/images-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }

    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchImages(searchQuery, page);

        setImages(prevImages => {
          return [...prevImages, ...data.results];
        });

        setShowBtn(data.total_pages && data.total_pages !== page);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page, searchQuery]);

  const handleSearch = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage />}

      {images.length > 0 && <ImageGallery items={images} />}

      {images.length > 0 && !isLoading && showBtn && (
        <button className={css.loadmore} onClick={handleLoadMore}>
          Load more
        </button>
      )}

      {isLoading && <Loader></Loader>}
    </>
  );
}
