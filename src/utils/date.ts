import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

export const now = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};

export const getStartOfDay = () => {
  return dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
};

export const getEndOfDay = () => {
  return dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
};

export const addMinutes = (date: Date | string, minutes: number) => {
  return dayjs(date).add(minutes, 'minute').format('YYYY-MM-DD HH:mm:ss');
};

export const isMoreThanOrEqual = (date: Date | string) => {
  return dayjs().isSameOrAfter(dayjs(date));
};
