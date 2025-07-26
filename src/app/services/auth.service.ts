import { Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environmnet";
import { HttpClient } from "@angular/common/http";
import { UserRegistrationDTO } from "../models/dto/user-registration.dto";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload{
    sub: string; 
    id?: number;
    exp?: number;
    iat?: number;
    [key: string]: any;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    private apiServerUrl = environment.apiBaseUrl;
    private _isLogedIn = signal<boolean>(false);
    private _currentUser = signal<JwtPayload | null>(null);

    public isLoggedIn = this._currentUser.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    

    constructor(private http: HttpClient
    ){
        const token = this.getToken();
        if(token){
           this.setUser(token);
        }
    }

    public registerUser(user: UserRegistrationDTO): Observable<any>{
        return this.http.post(`${this.apiServerUrl}/user/register`, user);
    }

    public login(username: string, password: string): Observable<any>{
        return this.http.post(`${this.apiServerUrl}/user/login`,{username, password});
    }

    public saveToken(token: string): void{
        localStorage.setItem('jwtToken', token);
        this.setUser(token);
    }

    public getToken(): string | null{
        return localStorage.getItem('jwtToken');
    }

    public logout(): void{
        localStorage.removeItem('jwtToken');
        this._isLogedIn.set(false);
        this._currentUser.set(null);
    }

    private setUser(token: string): void{
        try{
            const decodedToken = jwtDecode<JwtPayload>(token);
            this._currentUser.set(decodedToken);
            this._isLogedIn.set(true);
        }catch(error){
            console.log('Invalid token', error);
            this.logout();
        }
    }
}