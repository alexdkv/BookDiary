import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../core/services/book.service';
import { response } from 'express';
import { error } from 'console';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ShortenDescriptionPipe } from '../../shared/pipes/shorten.pipe';

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

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.getAllBooks();
  }

  public getAllBooks(): void {
  this.bookService.getAllBooks().subscribe({
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


}
