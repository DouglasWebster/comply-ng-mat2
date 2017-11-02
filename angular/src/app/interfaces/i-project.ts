import { IUser } from './i-user';

export interface IProject {
    _id?: string;
    createdON?: string;
    status?: string;
    name: string;
    description: string;
    permalink: string;
    owner: IUser;
    users: Array<Object>;
    tasks: Array<Object>;
}
