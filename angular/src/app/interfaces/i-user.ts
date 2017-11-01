export interface IUser {
    _id?: string;
    name: {
        first: string,
        last: string
    };
    address: {
        street: string,
        city: string,
        state: string,
        zip: string,
        country: string
    };
    email: string;
    phone: string;
    password: string;
    company: Object;
}
