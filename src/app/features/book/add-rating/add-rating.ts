import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { RatingService } from '../../../core/services/rating.service';
import { AuthService } from '../../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-rating',
  imports: [],
  templateUrl: './add-rating.html',
  styleUrl: './add-rating.css'
})
export class AddRating implements OnInit {
  @Input({ required: true }) bookId!: number;
  @Input() readonly: boolean = false;
  @Output() ratingSubmitted = new EventEmitter<number>();

  private authService = inject(AuthService);
  private ratingService = inject(RatingService);
  private destroyRef = inject(DestroyRef);

  protected stars: number[] = [1, 2, 3, 4, 5];
  protected currentRating: number = 0;
  protected userHasRated: boolean = false;
  protected userId: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.userId = this.authService.currentUser()?.id;
    this.checkUserRating();
  }

  protected rateBook(star: number): void {
    if (!this.userId) {
      return;
    }
    this.ratingService.rateBook(this.bookId, this.userId, star)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe({
      next: () => {
        this.currentRating = star;
        this.userHasRated = true;
        this.ratingSubmitted.emit(this.bookId);
      }
    });
  }

  private checkUserRating(): void {
    if (!this.bookId || !this.userId) {
      return;
    }

    this.ratingService.getUserRating(this.bookId, this.userId)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe({
      next: (rating: number) => {
        this.currentRating = rating;
        this.userHasRated = true;

      },
      error: () => this.userHasRated = false
    });
  }

}
