import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { RatingService } from '../../../core/services/rating.service';
import { AuthService } from '../../../core/services/auth.service';
import { EventEmitter } from 'stream';
import { RatingStateService } from '../../../core/services/rating.state.service';

@Component({
  selector: 'app-add-rating',
  imports: [],
  templateUrl: './add-rating.html',
  styleUrl: './add-rating.css'
})
export class AddRating implements OnInit {
  @Input({ required: true }) bookId!: number;
  @Input() readonly: boolean = false;


  private authService = inject(AuthService);
  private ratingService = inject(RatingService);
  private ratingStateService = inject(RatingStateService);

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
    this.ratingService.rateBook(this.bookId, this.userId, star).subscribe({
      next: () => {
        this.currentRating = star;
        this.userHasRated = true;
        this.ratingStateService.updateAverageRating(this.bookId);
      }
    });
  }

  private checkUserRating(): void {
    if (!this.bookId || !this.userId) {
      return;
    }

    this.ratingService.getUserRating(this.bookId, this.userId).subscribe({
      next: (rating: number) => {
        this.currentRating = rating;
        this.userHasRated = true;

      },
      error: () => this.userHasRated = false
    });
  }

  // public rateBook(star: number): void {
  //   console.log(this.userId);

  //   if (this.readonly) {
  //     return;
  //   }
  //   if (!this.bookId) {
  //     return;
  //   }
  //   if (!this.userId) {
  //     return;
  //   }
  //   this.ratingService.rateBook(this.bookId, this.userId, star).subscribe({
  //     next: () => {
  //       this.currentRating = star;
  //       this.userHasRated = true;
  //     },
  //     error: () => {
  //       alert('Couldnt submit rating');
  //     }
  //   })
  // }
}
