import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

dayjs.tz.setDefault('Asia/Bangkok');

export const now = () => {
  return dayjs.tz().format('YYYY-MM-DD HH:mm:ss');
};

export const getStartOfDay = () => {
  return dayjs.tz().startOf('day').format('YYYY-MM-DD HH:mm:ss');
};

export const getEndOfDay = () => {
  return dayjs.tz().endOf('day').format('YYYY-MM-DD HH:mm:ss');
};

export const addMinutes = (date: Date | string, minutes: number) => {
  return dayjs.tz(date).add(minutes, 'minute').format('YYYY-MM-DD HH:mm:ss');
};

export const isMoreThanOrEqual = (date: Date | string) => {
  return dayjs.tz().isSameOrAfter(dayjs.tz(date));
};
