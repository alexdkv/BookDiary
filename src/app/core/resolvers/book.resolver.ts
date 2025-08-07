import { Resolve, ResolveFn, Router } from "@angular/router";
import { Book } from "../../models/book";
import { inject } from "@angular/core";
import { BookService } from "../services/book.service";
import { catchError, map, of } from "rxjs";
import { log } from "node:console";

export const BookResolver: ResolveFn<Book | ReturnType<Router['parseUrl']>> = (route) =>{
    const id =Number( route.paramMap.get('id'));
    const router = inject(Router)
    const bookService = inject(BookService);
    
    if (id === null || isNaN(id)) {
        return router.parseUrl('/not-found');
  }

    return bookService.getBookById(id).pipe(
        map(book => {
            
            if(!book){
                throw new Error('Book not found');
            }
            return book;
        }),
        catchError(() => of(router.parseUrl('/not-found')))
    );
}