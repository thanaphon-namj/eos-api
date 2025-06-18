import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.tz.setDefault('Asia/Bangkok');

export const now = () => {
  return dayjs(new Date()).tz().toDate();
};

export const getStartOfDay = () => {
  return dayjs(new Date()).tz().startOf('day').toDate();
};

export const getEndOfDay = () => {
  return dayjs(new Date()).tz().endOf('day').toDate();
};

export const addMinutes = (minutes: number) => {
  return dayjs(new Date()).tz().add(minutes, 'minute').toDate();
};

export const isMoreThanOrEqual = (date: Date) => {
  return dayjs(new Date()).tz().isSameOrAfter(dayjs(date));
};
