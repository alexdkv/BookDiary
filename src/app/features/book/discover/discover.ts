import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../models/book';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShortenDescriptionPipe } from '../../../shared/pipes/shorten.pipe';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-discover',
  imports: [RouterModule, FormsModule, ShortenDescriptionPipe],
  templateUrl: './discover.html',
  styleUrl: './discover.css'
})
export class Discover implements OnInit {

  private books: Book[] = [];
  protected resultBooks: Book[] = [];
  private destroyRef = inject(DestroyRef);

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  public getAllBooks(): void {
    this.bookService.getAllBooks()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe({
      next: (response: Book[]) => {
        this.books = response;
        this.resultBooks = response;
        console.log(this.books);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
      complete: () => {
        console.log('Finished fetching books');
      }
    });
  }

  public searchBooks(key: string): void {
    if (key.length >= 1) {
      this.resultBooks = [];
      for (const book of this.books) {
        if (book.name.toLowerCase().indexOf(key.toLowerCase().trim()) !== -1 ||
          book.author.toLowerCase().indexOf(key.toLowerCase().trim()) !== -1) {
          this.resultBooks.push(book);
        }
      }
    }

    if (!key) {
      this.getAllBooks();
    }
  }
}
