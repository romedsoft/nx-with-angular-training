export class User {
    id?: string;
    name?:string;
    email? :string;
    phone? :string;
    isAdmin? : boolean;
    street? : string;
    apartment? : string;
    zip? : string;
    city? : string;
    country? : string;
    password? : string;
}

export class UserLogin{
    token?: string;
    user?: string;
}