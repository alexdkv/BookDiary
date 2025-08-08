import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../core/services/book.service';
import { response } from 'express';
import { error } from 'console';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ShortenDescriptionPipe } from '../../shared/pipes/shorten.pipe';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookRating } from '../book/book-rating/book-rating';

@Component({
  selector: 'app-home',
  imports: [RouterModule,
    ShortenDescriptionPipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  public books: Book[] = [];
  private destroyRef = inject(DestroyRef);
  protected quotes = [
    {quote:"A reader lives a thousand lives before he dies. The man who never reads lives only one.",
      author: "George R.R. Martin"
    },
    {
      quote:"There is nothing like looking, if you want to find something. You certainly usually find something, if you look, but it is not always quite the something you were after.",
      author:"J.R.R. Tolkien"
    },
    {
      quote:"The simple things are also the most extraordinary things, and only the wise can see them.",
      author:"Paulo Coelho"
    },
    {
      quote:"I wish, as well as everybody else, to be perfectly happy; but, like everybody else, it must be in my own way.",
      author:"Jane Austen"
    },
    {
      quote:"In spite of everything, I still believe people are really good at heart.",
      author:"Anne Frank"
    },
    {
      quote:"But you know, happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
      author:"J. K. Rowling"
    },
    {
      quote:"And so we beat on, boats against the current, borne back ceaselessly into the past.",
      author:"F. Scott Fitzgerald"
    },
    {
      quote:"Whatever our souls are made of, his and mine are the same.",
      author:"Emily Brontë"
    },
    {
      quote:"Nowadays people know the price of everything and the value of nothing.",
      author:"Oscar Wilde"
    },
    {
      quote:"The place where you made your stand never mattered. Only that you were there… and still on your feet.",
      author:"Stephen King"
    }
  ]

  protected randomQuote!: {quote: string, author: string};

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.getAllBooks();
    this.getRandomQuote();
  }

  public getAllBooks(): void {
  this.bookService.getAllBooks()
  .pipe(
    takeUntilDestroyed(this.destroyRef)
  )
  .subscribe({
      next: (response: Book[]) => {
        this.books = response;
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

  private getRandomQuote(): void{
    const randomNumber = Math.floor(Math.random() * this.quotes.length);
    this.randomQuote = this.quotes[randomNumber];
  }
}
