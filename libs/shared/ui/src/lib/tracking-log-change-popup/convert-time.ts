export const convertToSecFromTime = (
  hours: number,
  minutes: number,
  seconds: number
) => {
  return hours * 60 * 60 + minutes * 60 + seconds;
};

export const convertToTimeFromSec = (
  sec: number
): { hours: number; minutes: number; seconds: number } => {
  const hours = Math.trunc(sec / (60 * 60));
  const minutes = Math.trunc((sec - hours * 60 * 60) / 60);
  const seconds = sec - hours * 60 * 60 - minutes * 60;
  return {
    hours,
    minutes,
    seconds,
  };
};
