export const today = new Date();

export const getStartOfDay = (date: Date = today) => {
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

export const getEndOfDay = (date: Date = today) => {
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
