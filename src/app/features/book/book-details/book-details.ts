import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../models/book';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { BookRating } from '../book-rating/book-rating';
import { AuthService } from '../../../core/services/auth.service';
import { AddRating } from '../add-rating/add-rating';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-details',
  imports: [BookRating, AddRating],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails implements OnInit {
  public bookToShow: Book | undefined;
  private destroyRef = inject(DestroyRef);

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    protected authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.route.data
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data => {
      this.bookToShow = data['book'];
    })

  }
}
