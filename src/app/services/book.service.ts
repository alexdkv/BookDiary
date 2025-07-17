import { Injectable } from "@angular/core";
import { environment } from "../../environments/environmnet";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Book } from "../models/book";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class BookService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient
    ){}

    public getAllBooks(): Observable<Book[]>{
        return this.http.get<Book[]>(`${this.apiServerUrl}/book/allBooks`);
    }

    public getBookById(bookId: number): Observable<Book>{
        return this.http.get<Book>(`${this.apiServerUrl}/book/${bookId}`)
    }

    public addBook(userId: number, book: Book): Observable<Book>{
        return this.http.post<Book>(`${this.apiServerUrl}/book/addBook/user/${userId}`, book);
    }

    public updateBook(bookId: number, book: Book): Observable<Book>{
        return this.http.put<Book>(`${this.apiServerUrl}/book/update/${bookId}`, book);
    }

    public deleteBook(bookId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/book/delete/${bookId}`);
    }
}