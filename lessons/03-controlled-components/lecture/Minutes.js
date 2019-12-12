import React, { useState } from 'react';
import { format as formatDate } from 'date-fns';
import { FiMinus, FiPlus } from 'react-icons/fi';

export default function Minutes({ date }) {
  return (
    <div className="Minutes">
      <div>
        <button type="button" className="icon_button Minutes_button">
          <FiMinus />
        </button>
      </div>
      <input className="Minutes_input" defaultValue={0} id="minutes" />
      <div>
        <button type="button" className="icon_button Minutes_button">
          <FiPlus />
        </button>
      </div>
      <label className="Minutes_label" htmlFor="minutes">
        Mins on {formatDate(date, 'MMM do')}
      </label>
    </div>
  );
}
