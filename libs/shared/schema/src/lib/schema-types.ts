
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum BoardTaskType {
    TASKGROUP = "TASKGROUP",
    TASK = "TASK"
}

export enum Color {
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN",
    YELLOW = "YELLOW",
    BROWN = "BROWN",
    PINK = "PINK",
    GRAY = "GRAY"
}

export enum Status {
    TODO = "TODO",
    INPROGRESS = "INPROGRESS",
    CONFIRM = "CONFIRM",
    DONE = "DONE"
}

export interface CreateProjectInput {
    name: string;
    description?: string;
    color: Color;
    adminUserId: string;
}

export interface UpdateProjectInput {
    id: string;
    name: string;
    description?: string;
    color: Color;
    adminUserId: string;
}

export interface UpdateProjectMembersInput {
    projectId: string;
    addUserIds: string[];
    removeUserIds: string[];
}

export interface DeleteProjectInput {
    id: string;
}

export interface CreateBoardInput {
    name: string;
    description?: string;
    projectId: string;
}

export interface UpdateBoardInput {
    id: string;
    name: string;
    description?: string;
    projectId: string;
    tasksOrder: BoardTasksOrderItemInput[];
}

export interface DeleteBoardInput {
    id: string;
}

export interface CreateTaskOnBoardInput {
    title: string;
    description?: string;
    assignUserId?: string;
    boardId: string;
    scheduledTimeSec?: number;
}

export interface CreateTaskOnTaskGroupInput {
    title: string;
    description?: string;
    assignUserId?: string;
    taskGroupId: string;
    scheduledTimeSec?: number;
}

export interface UpdateTaskInput {
    id: string;
    title: string;
    description?: string;
    status: Status;
    assignUserId?: string;
    workTimeSec: number;
    scheduledTimeSec?: number;
    boardId: string;
    subtasksOrder: string[];
    taskGroupId?: string;
}

export interface DeleteTaskInput {
    id: string;
}

export interface CreateTaskGroupInput {
    title: string;
    description?: string;
    assignUserId?: string;
    boardId: string;
    scheduledTimeSec?: number;
}

export interface UpdateTaskGroupInput {
    id: string;
    title: string;
    description?: string;
    status: Status;
    assignUserId: string;
    scheduledTimeSec?: number;
    boardId: string;
    tasksOrder: string[];
}

export interface DeleteTaskGroupInput {
    id: string;
}

export interface CreateSubtaskInput {
    title: string;
    description?: string;
    assignUserId?: string;
    taskId: string;
    scheduledTimeSec?: number;
}

export interface UpdateSubtaskInput {
    id: string;
    title: string;
    description?: string;
    isDone: boolean;
    assignUserId?: string;
    workTimeSec: number;
    scheduledTimeSec?: number;
    taskId: string;
}

export interface DeleteSubtaskInput {
    id: string;
}

export interface BoardTasksOrderItemInput {
    taskId: string;
    type: BoardTaskType;
}

export interface UpdateMeInput {
    id: string;
    name: string;
    icon?: string;
}

export interface Node {
    id: string;
}

export interface IQuery {
    viewer(): User | Promise<User>;
    project(id: string): Project | Promise<Project>;
    board(id: string): Board | Promise<Board>;
    users(): User[] | Promise<User[]>;
    task(id: string): Task | Promise<Task>;
    taskGroup(id: string): TaskGroup | Promise<TaskGroup>;
    subtask(id: string): Subtask | Promise<Subtask>;
}

export interface IMutation {
    createProject(input: CreateProjectInput): Project | Promise<Project>;
    updateProject(input: UpdateProjectInput): Project | Promise<Project>;
    deleteProject(input: DeleteProjectInput): Project | Promise<Project>;
    updateProjectMembers(input: UpdateProjectMembersInput): Project | Promise<Project>;
    createBoard(input: CreateBoardInput): Board | Promise<Board>;
    updateBoard(input: UpdateBoardInput): Board | Promise<Board>;
    deleteBoard(input: DeleteBoardInput): Board | Promise<Board>;
    createTaskOnBoard(input: CreateTaskOnBoardInput): Task | Promise<Task>;
    createTaskOnTaskGroup(input: CreateTaskOnTaskGroupInput): Task | Promise<Task>;
    updateTask(input: UpdateTaskInput): Task | Promise<Task>;
    deleteTask(input: DeleteTaskInput): Task | Promise<Task>;
    createTaskGroup(input: CreateTaskGroupInput): TaskGroup | Promise<TaskGroup>;
    updateTaskGroup(input: UpdateTaskGroupInput): TaskGroup | Promise<TaskGroup>;
    deleteTaskGroup(input: DeleteTaskGroupInput): TaskGroup | Promise<TaskGroup>;
    createSubtask(input: CreateSubtaskInput): Subtask | Promise<Subtask>;
    updateSubtask(input: UpdateSubtaskInput): Subtask | Promise<Subtask>;
    deleteSubtask(input: DeleteSubtaskInput): Subtask | Promise<Subtask>;
    updateMe(input: UpdateMeInput): User | Promise<User>;
}

export interface User extends Node {
    id: string;
    name: string;
    icon?: string;
    projects: Project[];
}

export interface Board extends Node {
    id: string;
    name: string;
    description?: string;
    project: Project;
    soloTasks: Task[];
    taskGroups: TaskGroup[];
    tasksOrder: BoardTasksOrderItem[];
}

export interface BoardTasksOrderItem {
    taskId: string;
    type: BoardTaskType;
}

export interface Project extends Node {
    id: string;
    name: string;
    description?: string;
    color: Color;
    boards: Board[];
    members: User[];
    admin: User;
}

export interface Subtask extends Node {
    id: string;
    title: string;
    description?: string;
    isDone: boolean;
    assign?: User;
    task: Task;
    workTimeSec: number;
    scheduledTimeSec?: number;
}

export interface Task extends Node {
    id: string;
    title: string;
    description?: string;
    status: Status;
    subtasks: Subtask[];
    assign?: User;
    project: Project;
    board: Board;
    taskGroup?: TaskGroup;
    workTimeSec: number;
    scheduledTimeSec?: number;
    subtasksOrder?: string[];
}

export interface TaskGroup extends Node {
    id: string;
    title: string;
    description?: string;
    status: Status;
    tasks: Task[];
    assign?: User;
    project: Project;
    board: Board;
    scheduledTimeSec?: number;
    tasksOrder: string[];
}
