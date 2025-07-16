import { Book } from "./book";

export interface User{
    id: number;
    username: string;
    password: string;
    email: string;
    books: Book[];
}