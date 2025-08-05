import { computed, Injectable, signal } from '@angular/core';
import { RatingService } from './rating.service';

@Injectable({ providedIn: 'root' })
export class RatingStateService {

    constructor(private ratingService: RatingService,
    ) { }
    // Signal to track average ratings by book ID
    private averageRatings = signal(<Record<number, number>>({}));

    // Update the average rating for a specific book
    updateAverageRating(bookId: number): void {
        this.ratingService.getAvgRating(bookId).subscribe({
            next: (rating) => {
                this.averageRatings.update(ratings => ({
                    ...ratings,
                    [bookId]: rating
                }))
            },
            error: () => console.warn('FAiled to load ratings')

        })
    }

    // Get computed average rating for a book
    getAverageRating(bookId: number) {
        return computed(() => this.averageRatings()[bookId] ?? 0);
    }
}