export interface ICompany {
    _id?: string;
    name: string;
    address: {
        street: string,
        city: string,
        state: string,
        zip: string,
        country: string
    };
    phone: string;
    website: string;
}
