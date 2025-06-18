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

export const addMinutes = (minutes: number) => {
  return dayjs.tz().add(minutes, 'minute').format('YYYY-MM-DD HH:mm:ss');
};

export const isMoreThanOrEqual = (date: string) => {
  return dayjs
    .tz()
    .isSameOrAfter(dayjs(date, 'YYYY-MM-DD HH:mm:ss', 'Asia/Bangkok'));
};
