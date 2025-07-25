import { Injectable } from "@angular/core";
import { environment } from "../../environments/environmnet";
import { HttpClient } from "@angular/common/http";
import { UserRegistrationDTO } from "../models/dto/user-registration.dto";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient
    ){}

    public registerUser(user: UserRegistrationDTO): Observable<any>{
        return this.http.post(`${this.apiServerUrl}/user/register`, user);
    }
}