import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../components/images-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [imgForModal, setImgForModal] = useState('');
  let alt = '';

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
    if (searchQuery === newQuery) {
      return;
    }
    setSearchQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(evt) {
    setIsOpen(true);
    setImgForModal(evt.target.dataset.action);
    alt = evt.target.alt;
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} onClick={openModal} />}
      {images.length > 0 && !isLoading && showBtn && (
        <LoadMoreBtn handleLoadMore={handleLoadMore}></LoadMoreBtn>
      )}
      {isLoading && <Loader></Loader>}

      <ImageModal
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        imgForModal={imgForModal}
        alt={alt}
      ></ImageModal>
    </>
  );
}
