import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';

export default function TextInput({ id, label, type = 'text' }) {
  return (
    <>
      <VisuallyHidden>
        <label htmlFor={id}>{label}</label>
      </VisuallyHidden>
      <input id={id} placeholder={label} type={type} required />
    </>
  );
}
