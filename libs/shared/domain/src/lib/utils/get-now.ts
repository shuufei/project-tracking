import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getNow = (): Date => dayjs.utc().toDate();
