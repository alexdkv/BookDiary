import { Component, OnInit } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../models/book';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShortenDescriptionPipe } from '../../shared/pipes/shorten.pipe';

@Component({
  selector: 'app-discover',
  imports: [RouterModule, FormsModule, ShortenDescriptionPipe],
  templateUrl: './discover.html',
  styleUrl: './discover.css'
})
export class Discover implements OnInit{

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

  public searchBooks(key: string): void{
    const resultBooks: Book[] = [];
    if(key.length >= 3){
      for(const book of this.books){
      if(book.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 || 
        book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        resultBooks.push(book);
      }
    }
    this.books = resultBooks;
    }
    
    if (!key) {
      this.getAllBooks();
    }
  }
}
