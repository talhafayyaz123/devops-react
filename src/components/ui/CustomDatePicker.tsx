import React, { useState } from 'react';

import { formatISOStringToYYYYMMDD } from '@/helpers/utils/utils';

interface CustomDatePickerProps {
  data: string[];
  currentMonth: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  data,
  currentMonth,
  setMonth,
}) => {
  const currentDate = new Date();

  const [year, setYear] = useState<number>(currentDate.getFullYear());

  // Get the number of days in the selected month
  const getDaysInMonth = (month: string, year: number) => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate(); // Get last day of the month
  };

  const daysInMonth = getDaysInMonth(currentMonth, year);

  const events = data?.reduce((acc: Record<string, string[]>, item: string) => {
    const formattedDate = formatISOStringToYYYYMMDD(item);
    acc[formattedDate] = ['Event'];
    return acc;
  }, {});

  const changeMonth = (direction: 'prev' | 'next') => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const currentMonthIndex = monthNames.indexOf(currentMonth);

    if (direction === 'prev') {
      if (currentMonthIndex === 0) {
        setMonth('December');
        setYear(year - 1);
      } else {
        setMonth(monthNames[currentMonthIndex - 1]);
      }
    } else {
      if (currentMonthIndex === 11) {
        setMonth('January');
        setYear(year + 1);
      } else {
        setMonth(monthNames[currentMonthIndex + 1]);
      }
    }
  };

  // const handleDateClick = (day: number) => {
  //   const dateKey = `${year}-${String(new Date(`${month} 1, ${year}`).getMonth() + 1).padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  //   if (events[dateKey]) {
  //     // If date already has events, remove it
  //     const updatedEvents = { ...events };
  //     delete updatedEvents[dateKey];
  //     setEvents(updatedEvents);
  //     setSelectedDate(null);
  //   } else {
  //     // Add the selected date to events with a placeholder event
  //     setEvents({
  //       ...events,
  //       [dateKey]: [`Event on ${dateKey}`],
  //     });

  //     // Set the selected date
  //     setSelectedDate(dateKey);
  //   }
  // };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateKey = `${year}-${String(new Date(`${currentMonth} 1, ${year}`).getMonth() + 1).padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

      // Check if the day has any events
      const hasEvent = events && events[dateKey] ? events[dateKey] : null;

      days.push(
        <div
          role="button"
          tabIndex={0}
          key={i}
          className={`h-9 w-9 flex m-1 items-center text-gray-50 font-medium justify-center cursor-default hover:rounded-full
          ${hasEvent ? 'bg-blue-100 text-white font-medium rounded-full' : ''} 
         `}
        >
          {i}
        </div>,
      );
    }
    return days;
  };

  return (
    <div className="bg-white shadow-xl overflow-hidden rounded-lg mx-auto mt-4 text-gray-900 font-semibold text-center w-full max-w-[500px] h-full">
      <div className="flex items-center justify-around ">
        <button
          onClick={() => changeMonth('prev')}
          className="p-4 rounded-md text-black-100"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-lg">
          {currentMonth} {year}
        </div>
        <button
          onClick={() => changeMonth('next')}
          className="p-4 rounded-md text-black-100"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 grid-rows-6 p-3 gap-1 items-center">
        <div className="text-black-100">Mon</div>
        <div className="text-black-100">Tue</div>
        <div className="text-black-100">Wed</div>
        <div className="text-black-100">Thu</div>
        <div className="text-black-100">Fri</div>
        <div className="text-black-100">Sat</div>
        <div className="text-black-100">Sun</div>
        {renderDays()}
      </div>
    </div>
  );
};

export default CustomDatePicker;
