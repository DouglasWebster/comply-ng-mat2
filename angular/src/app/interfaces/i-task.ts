import { IUser } from './i-user';

export interface ITask {
    _id?: string;
    createdON?: string;
    name: string;
    description: string;
    owner: IUser;
    assignedTo: IUser;
    users: Array<Object>;
    history: Array<Object>;
    permalink: string;
}
