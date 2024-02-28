import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoIosSearch } from 'react-icons/io';
import css from './SearchBar.module.css';

const FeedbackSchema = Yup.object().shape({
  query: Yup.string()
    .min(1, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
});

export default function SearchBar({ onSearch }) {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          onSearch(values.query);
          actions.resetForm();
        }}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            name="query"
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit">
            <IoIosSearch className={css.icon} />
          </button>
        </Form>
      </Formik>
    </header>
  );
}
