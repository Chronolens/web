"use client";

import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file

const Calendar = ({ onDateRangeChange }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
    onDateRangeChange(ranges.selection); // Notify parent or other components about the selected date range
  };

  return (
    <div className="p-2 bg-gray-700 text-white shadow-md rounded-md calendar-container" style={{ width: '200px', height: '150px' }}>
      <h2 className="text-sm font-semibold mb-2">Date Range</h2>
      <div className="flex flex-col">
        <DateRange
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={state}
          className="custom-calendar" // Apply custom CSS class
        />
      </div>
      <div className="mt-2 text-sm">
        <strong>Range: </strong>
        {`${format(state[0].startDate, 'MMM d, yyyy')} - ${format(state[0].endDate, 'MMM d, yyyy')}`}
      </div>
    </div>
  );
};

export default Calendar;
