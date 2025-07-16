import { User } from "./user";

export interface Book{
    id: number;
    name: string;
    author: string;
    description: string;
    pages: number;
    photoUrl: string;
    status: string;
    user: User;
}