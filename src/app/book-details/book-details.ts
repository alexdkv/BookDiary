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
    this.route.data.subscribe(data => {
      this.bookToShow = data['book'];
    })
  }
}
