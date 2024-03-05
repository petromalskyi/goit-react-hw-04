import { IoIosSearch } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.target;
    const query = form.elements.query.value.trim();

    if (!query) {
      toast.error('Please enter anything in the field of search');
      return;
    }
    if (query.length < 2) {
      toast.error('To shot');
      return;
    }
    if (query.length > 50) {
      toast.error('To long');
      return;
    }

    onSubmit(query);

    form.reset();
  };

  return (
    <>
      <header className={css.header}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            name="query"
            placeholder="Search images and photos"
            type="text"
            autoFocus={true}
            required
          />

          <button className={css.button} type="submit">
            <IoIosSearch className={css.icon} />
          </button>
        </form>
      </header>
      <Toaster />
    </>
  );
}
