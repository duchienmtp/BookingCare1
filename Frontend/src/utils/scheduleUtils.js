export const generateTimeSlots = (intervalMinutes = 30) => {
  const slots = [];
  
  // Morning slots: 7:30-11:30
  const morningStart = 7 * 60 + 30; // 7:30 in minutes
  const morningEnd = 11 * 60 + 30; // 11:30 in minutes
  
  for (let time = morningStart; time < morningEnd; time += intervalMinutes) {
    const startTime = formatTime(time);
    const endTime = formatTime(time + intervalMinutes);
    slots.push(`${startTime} - ${endTime}`);
  }
  
  // Afternoon/Evening slots: 13:30-20:30
  const afternoonStart = 13 * 60 + 30; // 13:30 in minutes
  const afternoonEnd = 20 * 60 + 30; // 20:30 in minutes
  
  for (let time = afternoonStart; time < afternoonEnd; time += intervalMinutes) {
    const startTime = formatTime(time);
    const endTime = formatTime(time + intervalMinutes);
    slots.push(`${startTime} - ${endTime}`);
  }
  
  return slots;
};

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

const getWeekRange = (date = new Date()) => {
  const currentDate = new Date(date);
  const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Monday)
  
  // Calculate days to subtract to get to Monday
  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() + daysToMonday);

  const tuesday = new Date(currentDate);
  tuesday.setDate(currentDate.getDate() + daysToMonday + 1);

  const wednesday = new Date(currentDate);
  wednesday.setDate(currentDate.getDate() + daysToMonday + 2);

  const thursday = new Date(currentDate);
  thursday.setDate(currentDate.getDate() + daysToMonday + 3);

  const friday = new Date(currentDate);
  friday.setDate(currentDate.getDate() + daysToMonday + 4);

  const saturday = new Date(currentDate);
  saturday.setDate(currentDate.getDate() + daysToMonday + 5);

  const sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() + daysToMonday + 6);
  
  // Format dates as YYYY-MM-DD
  const format = (d) => d.toISOString().split('T')[0];
  
  return {
      MON: format(monday),
      TUE: format(tuesday),
      WED: format(wednesday),
      THU: format(thursday),
      FRI: format(friday),
      SAT: format(saturday),
      SUN: format(sunday),
      mondayDate: monday,
      tuesdayDate: tuesday,
      wednesdayDate: wednesday,
      thursdayDate: thursday,
      fridayDate: friday,
      saturdayDate: saturday,
      sundayDate: sunday
  };
}

export const generateScheduleData = (existedScheduleData = [], intervalMinutes = 30) => {
  const timeSlots = generateTimeSlots(intervalMinutes);
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const scheduleData = [];
  
  days.forEach(day => {
    let counter = 1;
    timeSlots.forEach(timeSlot => {
      const slotId = `SCHDL${counter.toString().padStart(3, '0')}_${day}`;
      scheduleData.push({
        id: slotId,
        time: timeSlot,
        day: day,
        scheduleDate: getWeekRange()[day],
        isTicked: existedScheduleData?.find(slot => slot.day === day && slot.time === timeSlot)?.isTicked || false
      });
      counter++;
    });
  });
  
  return scheduleData;
};

export const generateUniqueSlotId = (packageId, day, timeSlot) => {
  const timestamp = Date.now().toString().slice(-6);
  const dayCode = day.toUpperCase();
  const timeCode = timeSlot.replace(/[:\s-]/g, '');
  return `${packageId}_${dayCode}_${timeCode}_${timestamp}`;
};

export const parseTimeSlot = (timeSlot) => {
  const [startStr, endStr] = timeSlot.split(' - ');
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  return {
    start: parseTime(startStr),
    end: parseTime(endStr)
  };
};

export const isTimeSlotConflict = (slot1, slot2) => {
  const time1 = parseTimeSlot(slot1);
  const time2 = parseTimeSlot(slot2);
  
  return (time1.start < time2.end && time1.end > time2.start);
};

export const sortScheduleByTime = (schedule) => {
  const dayOrder = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  return schedule.sort((a, b) => {
    const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    
    const timeA = parseTimeSlot(a.time);
    const timeB = parseTimeSlot(b.time);
    return timeA.start - timeB.start;
  });
};