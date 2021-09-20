export const groupByKey = (list, key) =>
  list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );

export const isUAMobileMatch = (userAgent) =>
  Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

export const convertTimeToDHMS = (duration) => {
  // NOTE: dayjs type.d.ts not have .duration
  // NOTE: duration in seconds
  let days,
    hours,
    minutes,
    seconds = 0;

  if (duration > 0) {
    let convertToDay,
      convertToHour,
      convertToMinute,
      covertToSecond = 0;

    convertToDay = duration / 60 / 60 / 24;
    days = Math.floor(convertToDay);

    convertToHour = (convertToDay - days) * 24;
    if (convertToHour > 0) {
      hours = Math.floor(convertToHour);

      convertToMinute = (convertToHour - hours) * 60;
      if (convertToMinute > 0) {
        minutes = Math.floor(convertToMinute);

        covertToSecond = (convertToMinute - minutes) * 60;
        if (covertToSecond > 0) {
          seconds = Math.floor(covertToSecond);
        }
      }
    }
  }

  return { days, hours, minutes, seconds };
};

export const catZeroCharString = (num) =>
  num > -10 && num < 10 ? `0${num}` : `${num}`;
