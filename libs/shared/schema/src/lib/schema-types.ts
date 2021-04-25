
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

export interface Node {
    id: string;
}

export interface IQuery {
    viewer(): User | Promise<User>;
}

export interface IMutation {
    createProject(input: CreateProjectInput): Project | Promise<Project>;
}

export interface User extends Node {
    id: string;
    name: string;
    icon?: string;
    projects: Project[];
}

export interface Backlog extends Node {
    id: string;
    project: Project;
}

export interface Board extends Node {
    id: string;
    name: string;
    description?: string;
    project: Project;
}

export interface Project extends Node {
    id: string;
    name: string;
    description?: string;
    color: Color;
    backlog: Backlog;
    boards: Board[];
    members: User[];
    admin: User;
}
