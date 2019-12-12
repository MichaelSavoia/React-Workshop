import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import LoginForm from 'app/LoginForm';
import SignupForm from 'app/SignupForm';
import About from 'app/About';

function LoggedOut() {
  return (
    <div className="logged-out">
      <About />
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default LoggedOut;
