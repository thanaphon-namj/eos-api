import dayjs from 'dayjs';

export const now = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};

export const getStartOfDay = () => {
  return dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
};

export const getEndOfDay = () => {
  return dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
};

export const addMinutes = (minutes: number) => {
  return dayjs().add(minutes, 'minute').format('YYYY-MM-DD HH:mm:ss');
};

export const isMoreThanOrEqual = (date: string, minutes: number) => {
  return dayjs().diff(date, 'minute') >= minutes;
};
