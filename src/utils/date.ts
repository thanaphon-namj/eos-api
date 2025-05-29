export const today = () => {
  return new Date();
};

export const getStartOfDay = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0,
  );
};

export const getEndOfDay = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  );
};

export const addMinutes = (minutes: number) => {
  const current = today();
  return new Date(current.getTime() + minutes * 60 * 1000);
};

export const isMoreThanOrEqual = (date: Date, minutes: number) => {
  const current = today();
  const diffInMs = current.getTime() - date.getTime();
  const diffInMinutes = diffInMs / (1000 * 60);
  return diffInMinutes >= minutes;
};
