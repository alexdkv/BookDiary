import { Book } from "./book";
import { User } from "./user";

export interface Rating{
    id: number;
    stars: number;
    book: Book;
    user: User;
}