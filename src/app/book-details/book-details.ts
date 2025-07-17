import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails implements OnInit {
  public bookToShow: Book | undefined;

  constructor(private bookService: BookService,
    private route: ActivatedRoute
  ){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const bookId = Number(params.get('id'));
      if(bookId){
        this.getBookById(bookId);
      }
    })
  }
  
  public getBookById(bookId: number): void{
    this.bookService.getBookById(bookId).subscribe({
      next: (response: Book) => {
        this.bookToShow = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }
}
