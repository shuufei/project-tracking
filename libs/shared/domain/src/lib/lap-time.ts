import { createId } from './utils/create-id';
export type LapTime = {
  id: string;
  startDatetime: Date;
  endDatetime: Date;
};

export const createLapTime = (
  startDatetime: LapTime['startDatetime'],
  endDatetime: LapTime['endDatetime']
): LapTime => ({
  id: createId(),
  startDatetime,
  endDatetime,
});
