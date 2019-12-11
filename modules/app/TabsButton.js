import React from 'react';

function TabsButton({ children }) {
  return (
    <button className="tabs-button icon-button cta" type="submit">
      {children}
    </button>
  );
}

export default TabsButton;
