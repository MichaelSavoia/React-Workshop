import React, { useState } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { FiLogIn } from 'react-icons/fi';
import TabsButton from 'app/TabsButton';
import { login } from 'app/utils';

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

function LoginForm() {
  return (
    <form>
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        id="login:email"
        className="input-field"
        placeholder="you@example.com"
        type="text"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type="password"
        className="input-field"
        placeholder="Password"
      />

      <p>
        <label>
          <input
            className="password-checkbox"
            type="checkbox"
            defaultChecked={false}
          />{' '}
          show password
        </label>
      </p>

      <TabsButton>
        <FiLogIn />
        <span>Login</span>
      </TabsButton>
    </form>
  );
}

export default LoginForm;
