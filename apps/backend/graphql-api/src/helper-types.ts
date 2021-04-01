import type { Connection, PageInfo } from './schema-types';

export type OmitForConnectionNode<
  T extends Connection,
  K extends keyof T['edges'][number]['node']
> = {
  pageInfo: PageInfo;
  edges: {
    cursor: string;
    node: {
      [key in keyof Omit<
        T['edges'][number]['node'],
        K
      >]: T['edges'][number]['node'][key];
    };
  }[];
};
