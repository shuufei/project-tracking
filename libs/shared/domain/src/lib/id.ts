import { v4 as uuidv4 } from 'uuid';

export type Id = string;
export const createId = (): Id => uuidv4();
