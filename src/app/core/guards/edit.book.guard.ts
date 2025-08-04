import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { BookService } from "../services/book.service";
import { catchError, map, of } from "rxjs";

export const EditBookUserGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
  const router = inject(Router);
  const bookService = inject(BookService);

  const bookId = Number(route.paramMap.get('id'));
  const currentUser = authService.currentUser();

  if (isNaN(bookId)) {
    router.navigate(['/not-found']);
    return of(false);
  }

  return bookService.getBookById(bookId).pipe(
    map(book => {
        if (!book || book.user.id !== currentUser?.id) {
            router.navigate(['/unauthorized']);
            return false;
        }
        return true;
    }),
    catchError((err) => {
        router.navigate(['/not-found']);
        return of(false);
    })
  );
}