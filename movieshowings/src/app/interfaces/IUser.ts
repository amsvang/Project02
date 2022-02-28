import { IPurchase } from "./ipurchase";

export interface IUser {
    id?: number;
    first?: string;
    last?: string;
    email: string;
    password: string;
    purchases?:IPurchase;
}