import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useId } from 'react';
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
  //   const queryFieldId = useId();
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
          {/* <label className={css.label} htmlFor={queryFieldId}> */}

          {/* <IoIosSearch className={css.icon} /> */}
          <Field
            className={css.input}
            name="query"
            placeholder="Search images and photos"
            //   id={queryFieldId}
          />
          {/* </label> */}
          <button className={css.button} type="submit">
            <IoIosSearch className={css.icon} />
          </button>
        </Form>
      </Formik>
    </header>
  );
}
