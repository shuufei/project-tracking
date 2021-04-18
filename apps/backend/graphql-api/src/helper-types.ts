import type { Connection, Edge } from '@bison/shared/schema';

export type OmitConnectionNode<
  T extends Connection,
  K extends keyof T['edges'][number]['node']
> = Connection & {
  edges: (Edge & {
    node: {
      [key in keyof Omit<
        T['edges'][number]['node'],
        K
      >]: T['edges'][number]['node'][key];
    };
  })[];
};
