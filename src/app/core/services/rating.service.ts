import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environmnet";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class RatingService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAvgRating(bookId: number): Observable<number>{
        return this.http.get<number>(`${this.apiServerUrl}/book/rating/${bookId}`);
    }

    public rateBook(bookId: number, userId : number, stars: number): Observable<any> {
        const body = { userId, stars }
        return this.http.post(`${this.apiServerUrl}/book/rating/${bookId}`, body);
    }

    public getUserRating(bookId: number, userId: number): Observable<number>{
        const body = {userId}
        return this.http.get<number>(`${this.apiServerUrl}/book/rating/user?bookId=${bookId}&userId=${userId}`);
    }
}