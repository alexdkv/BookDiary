import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { UserService } from '../services/user.service';
import { response } from 'express';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { error } from 'console';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css'
})
export class UserDetails implements OnInit {
  public userBooks: Book[] = [];
  public currentUser: User | undefined = undefined;

  constructor(private userService: UserService,
               private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      if(userId){
        this.getUserById(userId);
        this.getBooksByUser(userId);
    }
    });
  
  }

  public getBooksByUser(userId: number): void{
    this.userService.getBooksByUser(userId).subscribe({
      next: (response: Book[]) => {
        this.userBooks = response;
      },
      error:(error: HttpErrorResponse) => {
      console.error(error.message);
      this.router.navigate(['/error']);
      }
    });
  }

  public getUserById(userId: number): void{
    this.userService.getUserById(userId).subscribe({
      next: (response: User) => {
        this.currentUser = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.router.navigate(['/error']);
      }
    })
  }
}
