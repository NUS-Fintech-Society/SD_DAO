export const getCurrentDateTime = () => {
  return Date.now();
};

export const showCurrentDateTime = (date: number) => {
  return new Date(date).toLocaleString();
};

export const showCurrentDate = (date: number) => {
  return new Date(date).toLocaleString('en-US', { dateStyle: 'short' });
};

export const getReadableDate = (date: number) => {
  return new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const timeSince = (date: number) => {
  const currDate = getCurrentDateTime();
  const seconds = Math.floor((currDate - date) / 1000);

  let interval = seconds / 63072000;

  if (interval > 1) {
    return Math.floor(interval + 1) + ' years';
  }
  interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' year';
  }
  interval = seconds / 5184000;
  if (interval > 1) {
    return Math.floor(interval + 1) + ' months';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' month';
  }
  interval = seconds / 172800;
  if (interval > 1) {
    return Math.floor(interval + 1) + ' days';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' day';
  }
  interval = seconds / 7200;
  if (interval > 1) {
    return Math.floor(interval + 1) + ' hours';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hour';
  }
  interval = seconds / 120;
  if (interval > 1) {
    return Math.floor(interval + 1) + ' minutes';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minute';
  }

  if (seconds > 1 || seconds === 0) {
    return Math.floor(seconds) + ' seconds';
  }
  return Math.floor(seconds) + ' second';
};
