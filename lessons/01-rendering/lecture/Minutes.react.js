import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import './styles.css';

export default function Minutes({ date = new Date() }) {
  const minutes = 2;

  return (
    <div className="minutes">
      <div>
        <button type="button" className="icon-button minutes-button">
          <FiMinus />
        </button>
      </div>
      <input className="minutes-input" value={minutes} id="minutes" />
      <div>
        <button type="button" className="icon-button minutes-button">
          <FiPlus />
        </button>
      </div>
      <label className="minutes-label" htmlFor="minutes">
        Minutes
      </label>
    </div>
  );
}
