import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Book } from '../../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookRating } from '../book-rating/book-rating';
import { AuthService } from '../../../core/services/auth.service';
import { AddRating } from '../add-rating/add-rating';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RatingService } from '../../../core/services/rating.service';

@Component({
  selector: 'app-book-details',
  imports: [BookRating, AddRating],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails implements OnInit {

  protected bookToShow: Book | undefined;
  private destroyRef = inject(DestroyRef);
  protected averageRating = signal(0);

  constructor(
    private ratingService: RatingService,
    private route: ActivatedRoute,
    protected authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.data
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe ({
      next: (data => {
        this.bookToShow = data['book'];
        if (!this.bookToShow?.id) {
          this.router.navigate(['/not-found']);
          return; 
        }
        
        this.loadRating(this.bookToShow!.id);
      }),
      error: () => {
        this.router.navigate(['/not-found']);
      }
    })   
  }

  loadRating(bookId: number): void {
    this.ratingService.getAvgRating(bookId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: rating => this.averageRating.set(rating),
        error: () => console.warn('Failed to load rating')
      });
  }

  updateRating(bookId: number): void {
    this.loadRating(bookId);
  }

}
