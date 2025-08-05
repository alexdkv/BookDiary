import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../../../core/services/book.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from '../../../models/book';
import { error } from 'console';

@Component({
  selector: 'app-add-book',
  imports: [FormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook implements OnInit {
  private currentUser: User | undefined;

  bookStatus: string[] = [
    'READ',
    'WANT_TO_READ',
    'READING'
  ];
  constructor(private bookService: BookService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      if (userId) {
        this.getUserById(userId);

      }
    });
  }

  public getUserById(userId: number): void {
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

  public onSubmit(form: NgForm): void {

    const bookToAdd: Book = {
      ...form.value,
      user: this.currentUser
    };
    console.log(bookToAdd);

    this.bookService.addBook(this.currentUser!.id, bookToAdd).subscribe({
      next: () => this.router.navigate(['/user', this.currentUser?.id]),
      error: error => {
        console.log(error.message);
      }
    })
  }
}
