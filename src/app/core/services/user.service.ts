import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environmnet";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { Book } from "../../models/book";

@Injectable({providedIn: 'root'})
export class UserService{
    private apiServerUrl = environment.apiBaseUrl;
    
    constructor(private http: HttpClient){}

    public getUserById(userId: number): Observable<User>{
        return this.http.get<User>(`${this.apiServerUrl}/user/${userId}`);
    }

    public getBooksByUser(userId: number): Observable<Book[]>{
        return this.http.get<Book[]>(`${this.apiServerUrl}/user/${userId}/books`);
    }

}