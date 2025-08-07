import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { dir, error } from 'console';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../../../core/services/book.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-user-details',
  imports: [FormsModule, RouterModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css'
})
export class UserDetails implements OnInit {
  public userBooks: Book[] = [];
  public filteredBooks: Book[] = [];
  public currentUser: User | undefined = undefined;
  private destroyRef = inject(DestroyRef);

  constructor(private userService: UserService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(params => {
      const userId = Number(params.get('id'));
      if (userId) {
        this.getUserById(userId);
        this.getBooksByUser(userId);
      }
    });

  }

  public getBooksByUser(userId: number): void {
    this.userService.getBooksByUser(userId)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (response: Book[]) => {
        this.userBooks = response;
        this.filteredBooks = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        this.router.navigate(['/error']);
      }
    });
  }

  public getUserById(userId: number): void {
    this.userService.getUserById(userId)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (response: User) => {
        this.currentUser = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.router.navigate(['/error']);
      }
    })
  }

  public onAddBook(addForm: NgForm, userId: number | undefined): void {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    document.getElementById('add-book-form')?.click();
    this.bookService.addBook(userId, addForm.value).subscribe({
      next: (response: Book) => {
        this.getBooksByUser(userId);
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.router.navigate(['/error']);
      }
    })
  }

  public onDeleteBook(bookId: number): void {
    if (confirm("Are you sure you want to delete book: ?")) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          console.log('Book deleted');
          this.userBooks = this.userBooks.filter(book => book.id !== bookId);
          this.filteredBooks = this.filteredBooks.filter(book => book.id !== bookId);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })
    }
  }

  public filterBooks(status: string) {
    if (status === 'ALL') {
      this.filteredBooks = this.userBooks;
    } else {
      this.filteredBooks = this.userBooks.filter(book => book.status === status);
    }
  }
}
