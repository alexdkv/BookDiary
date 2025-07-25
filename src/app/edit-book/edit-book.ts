import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-edit-book',
  imports: [FormsModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css'
})
export class EditBook implements OnInit{
  public bookToEdit: Book | undefined;
  private bookId: number = 0;
  bookStatus: string[] = [
    'READ',
    'WANT_TO_READ',
    'READING'
  ];

  constructor(private bookService: BookService, 
    private route: ActivatedRoute,
    private router: Router
  ){}


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.bookToEdit = data['book'];
    })
    this.bookId = this.bookToEdit!.id;
  }
 
  public onEditBook(editForm: NgForm): void{
    const updatedBook = {...this.bookToEdit, ...editForm.value};
    this.bookService.updateBook(this.bookId,updatedBook).subscribe({
      next: (response => {
        console.log("Book updated!");
        editForm.reset;
        this.router.navigate(['/home']);
      }),
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }
}
