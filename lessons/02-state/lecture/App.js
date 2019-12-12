import './styles.css';
import React, { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

export default function Minutes() {
  const minutes = 5;
  return (
    <div className="minutes">
      <div>
        <button type="button" className="icon-button minutes-button">
          <FiMinus />
        </button>
      </div>
      <div className="minutes-label" htmlFor="minutes">
        {minutes} Minutes
      </div>
      <div>
        <button type="button" className="icon-button minutes-button">
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
