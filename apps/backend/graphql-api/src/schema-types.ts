
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Color {
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN",
    YELLOW = "YELLOW",
    BROWN = "BROWN",
    PINK = "PINK",
    GRAY = "GRAY"
}

export interface CreateProjectInput {
    name: string;
    description?: string;
    color: Color;
    adminUserId: string;
    memberUserIds: string[];
}

export interface UpdateProjectInput {
    id: string;
    name: string;
    description?: string;
    color: Color;
    adminUserId: string;
    memberUserIds: string[];
}

export interface Connection {
    pageInfo: PageInfo;
    edges: Edge[];
}

export interface Edge {
    cursor?: string;
    node: Node;
}

export interface Node {
    id: string;
}

export interface IQuery {
    projects(first: number, after?: string): ProjectConnection | Promise<ProjectConnection>;
}

export interface IMutation {
    createProject(input: CreateProjectInput): Project | Promise<Project>;
}

export interface User extends Node {
    id: string;
    name: string;
    icon?: string;
    projects: ProjectConnection;
}

export interface UserEdge extends Edge {
    cursor: string;
    node: User;
}

export interface UserConnection extends Connection {
    pageInfo: PageInfo;
    edges: UserEdge[];
}

export interface Backlog extends Node {
    id: string;
    project: Project;
}

export interface Board extends Node {
    id: string;
    name: string;
    description?: string;
    isArchive: boolean;
    project: Project;
}

export interface BoardEdge extends Edge {
    cursor: string;
    node: Board;
}

export interface BoardConnection extends Connection {
    pageInfo: PageInfo;
    edges: BoardEdge[];
}

export interface Project extends Node {
    id: string;
    name: string;
    description?: string;
    color: Color;
    backlog: Backlog;
    boards: BoardConnection;
    users: UserConnection;
}

export interface ProjectEdge extends Edge {
    cursor?: string;
    node: Project;
}

export interface ProjectConnection extends Connection {
    pageInfo: PageInfo;
    edges: ProjectEdge[];
}

export interface PageInfo {
    endCursor?: string;
    hasNextPage: boolean;
}
