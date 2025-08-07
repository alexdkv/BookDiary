import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-book-rating',
    imports: [],
    templateUrl: './book-rating.html',
    styleUrl: './book-rating.css'
})
export class BookRating {
    @Input({ required: true }) bookId!: number;
    @Input() averageRating: number = 0;
    @Input() readonly: boolean = false;
    
    stars = [1, 2, 3, 4, 5];
    
    constructor() { }

    get roundedAvgRating(): number {
        return Math.round(this.averageRating * 2) / 2;
  }

}
