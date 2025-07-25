import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  constructor(private authService: AuthService, private router: Router){}

  public onRegister(form: NgForm): void{
    if(form.invalid) return;

    console.log("Registering user with data:", form.value);

    this.authService.registerUser(form.value).subscribe({
      next: () => {
        form.resetForm();
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
    }
    });
  }
}
