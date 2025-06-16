import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Bangkok');

export const getStartOfDay = (date: Date) => {
  return dayjs(date).startOf('day').toDate();
};

export const getEndOfDay = (date: Date) => {
  return dayjs(date).endOf('day').toDate();
};

export const addMinutes = (minutes: number) => {
  return dayjs().add(minutes, 'minute').toDate();
};

export const isMoreThanOrEqual = (date: Date, minutes: number) => {
  return dayjs().diff(date, 'minute') >= minutes;
};

export default dayjs;
