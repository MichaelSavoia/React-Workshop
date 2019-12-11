import React, { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { format as formatDate } from 'date-fns';

function Minutes({ date }) {
  const [minutes, setMinutes] = useState(30);

  const subtract = () => {
    if (minutes > 0) {
      setMinutes(minutes - 1);
    }
  };

  const add = () => {
    setMinutes(minutes + 1);
  };

  const handleInputChange = e => {
    const value = e.target.value;
    const specialCaseEmpty = value.trim() === '';
    // allow input to be empty
    if (specialCaseEmpty) {
      setMinutes(value);
    } else {
      const int = parseInt(e.target.value, 10);
      // disallow non-numeric value
      if (!isNaN(int)) {
        setMinutes(int);
      }
    }
  };

  const handleInputBlur = e => {
    if (e.target.value.trim() === '') {
      setMinutes(0);
    }
  };

  return (
    <div className="minutes">
      <div>
        <button
          className="icon-button link minutes-button"
          onClick={subtract}
          type="button"
        >
          <FiMinus />
        </button>
      </div>
      <input
        type="text"
        className="minutes-input"
        value={minutes}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <div>
        <button
          className="icon-button link minutes-button"
          onClick={add}
          type="button"
        >
          <FiPlus />
        </button>
      </div>
      <label htmlFor="minutes" className="minutes-label">
        Minutes on {formatDate(date, 'MMM do')}
      </label>
    </div>
  );
}

export default Minutes;
