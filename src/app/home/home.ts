import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { response } from 'express';
import { error } from 'console';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [],
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
    this.bookService.getAllBooks().subscribe(
      (response: Book[]) => {
        this.books = response;
        console.log(this.books);
      },
      (error: HttpErrorResponse) =>{
        console.log(error.message);
      }
    );
  }


}
