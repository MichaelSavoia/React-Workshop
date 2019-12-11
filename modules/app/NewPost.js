import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { format as formatDate, set } from 'date-fns';

import { useAppState } from 'app/app-state';
import { createPost, DATE_FORMAT } from 'app/utils';

const MAX_MESSAGE_LENGTH = 200;

const NewPostSchema = Yup.object().shape({
  message: Yup.string()
    .max(MAX_MESSAGE_LENGTH, 'Too many characters!')
    .min(1, 'Required')
    .required('Required')
});

function NewPost({ date, onSuccess }) {
  const [{ auth }] = useAppState();

  return (
    <div className="new-post">
      <Formik
        initialValues={{
          message: '',
          minutes: 30
        }}
        validationSchema={NewPostSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const post = await createPost({
              message: values.message,
              minutes: values.minutes,
              date: formatDate(date, DATE_FORMAT),
              uid: auth.uid
            });
            resetForm();
            onSuccess(post);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {props => (
          <Form>
            <Field className="new-post-input" name="message" as="textarea" />
            <div className="new-post-char-count">
              {props.values.message.length}/{MAX_MESSAGE_LENGTH}
            </div>
            <div className="new-post-bottom">
              <div>
                <button
                  className="cta icon-button"
                  disabled={props.isSubmitting}
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewPost;
