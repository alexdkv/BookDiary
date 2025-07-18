import { Resolve, ResolveFn, Router } from "@angular/router";
import { Book } from "../models/book";
import { inject } from "@angular/core";
import { BookService } from "../services/book.service";
import { catchError, map, of } from "rxjs";

export const BookResolver: ResolveFn<Book | ReturnType<Router['parseUrl']>> = (route) =>{
    const idString = route.paramMap.get('id');
    const router = inject(Router)
    const id = idString ? parseInt(idString, 10) : null;
    const bookService = inject(BookService);
    
    if (id === null || isNaN(id)) {
    return router.parseUrl('/not-found');
  }

    return bookService.getBookById(id).pipe(
        map(book => {
            if(!book){
                return router.parseUrl('/not-found');
            }
            return book;
        }),
        catchError(() => of(router.parseUrl('/not-found')))
    );
}