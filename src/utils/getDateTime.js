const getTime = (date) => {
  const hours = date.getHours();
  const mins = date.getMinutes();
  const sec = date.getSeconds();
  const status = hours > 12 ? "PM" : "AM";
  const timeString = `${hours}:${mins} ${status}`;

  return { hours, mins, sec, status, timeString };
};

const getDate = (date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[date.getDay()];
  const _date = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getYear() + 1900;

  const dateString = `${day} ${month} ${_date}, ${year}`;
  return { day, _date, month, year, dateString };
};

const getDateTime = (date) => {
  if (date) {
    const time = getTime(date);
    const d = getDate(date);
    return {
      timeString: time.timeString,
      dateString: d.dateString,
      time,
      date: d,
    };
  }
};

export default getDateTime;
