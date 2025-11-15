import React from 'react';
import { Table } from 'react-bootstrap';
import { BsCheck, BsX } from 'react-icons/bs';

const ScheduleGrid = ({
  timeSlots,
  days,
  scheduleData,
  onToggleSlot
}) => {
  const getSlotData = (day, time) => {
    return scheduleData.find(slot => slot.day === day && slot.time === time);
  };

  const getDayName = (dayCode) => {
    const dayNames = {
      'MON': 'Monday',
      'TUE': 'Tuesday', 
      'WED': 'Wednesday',
      'THU': 'Thursday',
      'FRI': 'Friday',
      'SAT': 'Saturday',
      'SUN': 'Sunday'
    };
    return dayNames[dayCode] || dayCode;
  };

  const formatTimeSlot = (time) => {
    return time.replace(' - ', '\n');
  };

  return (
    <div className="schedule-grid-container">
      <div className="table-responsive">
        <Table className="schedule-table">
          <thead>
            <tr>
              <th className="time-header">Time</th>
              {days.map(day => (
                <th key={day} className="day-header">
                  <div className="day-cell">
                    <div className="day-code">{day}</div>
                    <div className="day-name">{getDayName(day)}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlot => (
              <tr key={timeSlot}>
                <td className="time-cell">
                  <div className="time-slot">
                    {formatTimeSlot(timeSlot).split('\n').map((line, index) => (
                      <div key={index} className={index === 0 ? 'time-start' : 'time-end'}>
                        {line}
                      </div>
                    ))}
                  </div>
                </td>
                {days.map(day => {
                  const slot = getSlotData(day, timeSlot);
                  console.log("slot: ", slot);
                  const isAvailable = slot?.isTicked || false;
                  
                  return (
                    <td key={`${day}-${timeSlot}`} className="schedule-cell">
                      <button
                        type="button"
                        className={`slot-button ${isAvailable ? 'available' : 'unavailable'}`}
                        onClick={() => slot && onToggleSlot(slot.id)}
                        title={`${getDayName(day)} ${timeSlot} - ${isAvailable ? 'Available' : 'Unavailable'}`}
                      >
                        {isAvailable ? (
                          <BsCheck className="slot-icon check-icon" />
                        ) : (
                          <BsX className="slot-icon cross-icon" />
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      <div className="schedule-legend">
        <div className="legend-item">
          <BsCheck className="legend-icon available" />
          <span>Available</span>
        </div>
        <div className="legend-item">
          <BsX className="legend-icon unavailable" />
          <span>Unavailable</span>
        </div>
        <div className="legend-note">
          <small>Click on any time slot to toggle availability</small>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;