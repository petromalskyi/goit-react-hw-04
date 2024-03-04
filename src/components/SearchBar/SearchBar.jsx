import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoIosSearch } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

const FeedbackSchema = Yup.object().shape({
  query: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!'),
  // .required('Required'),
});

export default function SearchBar({ onSubmit }) {
  return (
    <>
      <header className={css.header}>
        <Formik
          initialValues={{ query: '' }}
          onSubmit={(values, actions) => {
            {
              if (!values.query.trim()) {
                toast.error('Please enter anything in the field of search');
              } else {
                onSubmit(values.query);
                actions.resetForm();
              }
            }
          }}
          validationSchema={FeedbackSchema}
        >
          <Form className={css.form}>
            <Field
              className={css.input}
              name="query"
              placeholder="Search images and photos"
              type="text"
              autoFocus={true}
            />
            <ErrorMessage className={css.error} name="query" component="b" />
            <button className={css.button} type="submit">
              <IoIosSearch className={css.icon} />
            </button>
          </Form>
        </Formik>
      </header>
      <Toaster />
    </>
  );
}
