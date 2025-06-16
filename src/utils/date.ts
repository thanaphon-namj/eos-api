import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Bangkok');

export const getStartOfDay = () => {
  return dayjs.tz().startOf('day').format('YYYY-MM-DD HH:mm:ss');
};

export const getEndOfDay = () => {
  return dayjs.tz().endOf('day').format('YYYY-MM-DD HH:mm:ss');
};

export const addMinutes = (minutes: number) => {
  return dayjs.tz().add(minutes, 'minute').format('YYYY-MM-DD HH:mm:ss');
};

export const isMoreThanOrEqual = (date: string, minutes: number) => {
  return dayjs.tz().diff(date, 'minute') >= minutes;
};

export default dayjs;
