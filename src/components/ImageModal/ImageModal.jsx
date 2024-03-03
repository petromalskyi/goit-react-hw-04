import Modal from 'react-modal';

Modal.setAppElement('#root');

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
    height: '720px',
    padding: '0',
    margin: '0',
    objectFit: 'cover',
  },
};

export default function ImageModal({
  openModal,
  modalIsOpen,
  imgForModal,
  closeModal,
  alt,
}) {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        onClick={openModal}
      >
        <img src={imgForModal} alt={alt} />;
      </Modal>
    </>
  );
}
