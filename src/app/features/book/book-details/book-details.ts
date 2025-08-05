import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../models/book';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { BookRating } from '../book-rating/book-rating';

@Component({
  selector: 'app-book-details',
  imports: [BookRating],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails implements OnInit {
  public bookToShow: Book | undefined;

  constructor(private bookService: BookService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.bookToShow = data['book'];
    })
  }
}
