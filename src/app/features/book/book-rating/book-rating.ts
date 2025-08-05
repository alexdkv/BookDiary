import { Component, inject, Input, OnInit } from '@angular/core';
import { RatingService } from '../../../core/services/rating.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/user';

@Component({
    selector: 'app-book-rating',
    imports: [],
    templateUrl: './book-rating.html',
    styleUrl: './book-rating.css'
})
export class BookRating implements OnInit {
    @Input() bookId!: number | undefined;
    @Input() readonly: boolean = false;

    private authService = inject(AuthService);

    protected stars: number[] = [1, 2, 3, 4, 5];
    protected currentRating: number = 0;
    protected averageRating: number = 0;
    protected userHasRated: boolean = false;
    protected userId: number | undefined;

    constructor(private ratingService: RatingService) { }

    ngOnInit(): void {
        this.userId = this.authService.currentUser()?.id;
        this.getAvgRating();
        this.checkUserRating();
    }

    private getAvgRating(): void {
        if (!this.bookId) {
            return;
        }
        this.ratingService.getAvgRating(this.bookId).subscribe({
            next: (rating: number) => {
                this.averageRating = rating;
            },
            error: () => {
                console.warn('Could not load rating');
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

    public rateBook(star: number): void {
        console.log(this.userId);

        if (this.readonly) {
            return;
        }
        if (!this.bookId) {
            return;
        }
        if (!this.userId) {
            return;
        }
        this.ratingService.rateBook(this.bookId, this.userId, star).subscribe({
            next: () => {
                this.currentRating = star;
                this.userHasRated = true;
                this.getAvgRating();
            },
            error: () => {
                alert('Couldnt submit rating');
            }
        })
    }

}
