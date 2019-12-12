import React, { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import { parseISO } from 'date-fns';

import { signup } from 'app/utils';
import TabsButton from 'app/TabsButton';
import TextInput from 'app/TextInput';
import { DateFields, MonthField, DayField, YearField } from 'app/DateFields';

// import SignupFormFinal from './SignupForm.final';
// export default SignupFormFinal;

function SignupForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('2019-09-01');

  const parsedStartDate = parseISO(startDate);

  const handleSignup = async event => {
    event.preventDefault();
    setLoading(true);
    const [displayName, photoURL, email, password] = event.target.elements;
    try {
      await signup({
        displayName: displayName.value,
        email: email.value,
        password: password.value,
        photoURL: photoURL.value,
        startDate: parsedStartDate
      });
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div>
      {error && (
        <div>
          <p>Oops, there was an error logging you in.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      )}

      <form onSubmit={handleSignup}>
        <TextInput id="displayName" label="Display Name" />
        <TextInput id="photoURL" label="Avatar URL" />
        <TextInput id="email" label="Email" />
        <TextInput id="password" type="password" label="Password" />
        <p>
          <span aria-hidden="true">Start:</span>{' '}
          <DateFields
            value={startDate}
            onChange={setStartDate}
            start={2018}
            end={2019}
          />
        </p>
        <TabsButton>
          <FiZap />
          <span>{loading ? 'Loading...' : 'Sign Up'}</span>
        </TabsButton>
      </form>
    </div>
  );
}

export default SignupForm;
