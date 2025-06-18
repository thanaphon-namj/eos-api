import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.tz.setDefault('Asia/Bangkok');

export const now = () => {
  return dayjs.tz().toDate();
};

export const getStartOfDay = () => {
  return dayjs.tz().startOf('day').toDate();
};

export const getEndOfDay = () => {
  return dayjs.tz().endOf('day').toDate();
};

export const addMinutes = (minutes: number) => {
  return dayjs.tz().add(minutes, 'minute').toDate();
};

export const isMoreThanOrEqual = (date: Date) => {
  return dayjs.tz().isSameOrAfter(dayjs(date));
};
