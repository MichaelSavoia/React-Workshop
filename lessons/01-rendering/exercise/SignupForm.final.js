import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { FiZap } from 'react-icons/fi';
import { DateFields, MonthField, DayField, YearField } from 'app/DateFields';

function TabsButton({ children }) {
  return (
    <button className="tabs-button icon-button cta" type="submit">
      {children}
    </button>
  );
}

function TextInput({ id, label, type = 'text' }) {
  return (
    <>
      <VisuallyHidden>
        <label htmlFor={id}>{label}</label>
      </VisuallyHidden>
      <input id={id} placeholder={label} type={type} required />
    </>
  );
}

export default function SignupForm() {
  return (
    <form>
      <TextInput id="displayName" label="Display Name" />
      <TextInput id="photoURL" label="Avatar URL" />
      <TextInput id="email" label="Email" />
      <TextInput id="password" type="password" label="Password" />
      <p>
        <span aria-hidden="true">Start:</span>{' '}
        <DateFields value={new Date()}>
          <MonthField aria-label="Start Month" /> /{' '}
          <DayField aria-label="Start Day" /> /{' '}
          <YearField start={2018} end={2019} aria-label="Start year" />
        </DateFields>
      </p>
      <TabsButton>
        <FiZap />
        <span>Sign Up</span>
      </TabsButton>
    </form>
  );
}
