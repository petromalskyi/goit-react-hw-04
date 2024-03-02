import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../components/images-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';
import ImageModal from '../ImageModal/ImageModal';
import Modal from 'react-modal';

let alt = '';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(39, 39, 39, 0.8)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '1080px',
    height: '700px',
    padding: '0',
    objectFit: 'cover',
  },
};

Modal.setAppElement('#root');

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [imgForModal, setImgForModal] = useState('img_img');

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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(evt) {
    setIsOpen(true);
    setImgForModal(evt.target.dataset.action);
    console.log(evt.target.alt);
    alt = evt.target.alt;
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} onClick={openModal} />}
      {images.length > 0 && !isLoading && showBtn && (
        <button className={css.loadmore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
      {isLoading && <Loader></Loader>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        onClick={openModal}
      >
        <ImageModal src={imgForModal} alt={alt}></ImageModal>
      </Modal>
      ;
    </>
  );
}
