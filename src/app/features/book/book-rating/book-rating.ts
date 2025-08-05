import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { RatingService } from '../../../core/services/rating.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/user';
import { RatingStateService } from '../../../core/services/rating.state.service';

@Component({
    selector: 'app-book-rating',
    imports: [],
    templateUrl: './book-rating.html',
    styleUrl: './book-rating.css'
})
export class BookRating implements OnInit {
    @Input({ required: true }) bookId!: number;
    @Input() readonly: boolean = false;

    stars = [1, 2, 3, 4, 5];
    private ratingStateService = inject(RatingStateService)

    constructor(private ratingService: RatingService) { }

    averageRating = computed(() => 0);
    roundedAvgRating = computed(() => {
        const rating = this.averageRating();
        return Math.round(rating * 2) / 2;
    })

    ngOnInit(): void {
        //this.getAvgRating();
        this.averageRating = this.ratingStateService.getAverageRating(this.bookId);
        this.ratingStateService.updateAverageRating(this.bookId);

    }

    // private getAvgRating(): void {
    //     if (!this.bookId) {
    //         return;
    //     }
    //     this.ratingService.getAvgRating(this.bookId).subscribe({
    //         next: (rating) => {
    //             this.averageRating.set(rating);
    //         },
    //         error: () => {
    //             console.warn('Could not load rating');
    //         }
    //     });
    // }


}
