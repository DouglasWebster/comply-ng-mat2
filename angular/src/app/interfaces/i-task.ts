import { IUser } from './i-user';

export interface ITask {
    _id?: string;
    name: string;
    description: string;
    owner: IUser;
    assignedTo: Object;
    users: Array<Object>;
    history: Array<Object>;
    permalink: string;
}
