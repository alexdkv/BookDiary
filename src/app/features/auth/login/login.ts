import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private authService: AuthService, private router: Router){}

  protected loginFailedMessage: string | null = null;

  public onLogin(form: NgForm): void{
    const {username, password} = form.value;
    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.loginFailedMessage = null;
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        this.loginFailedMessage = 'Ivalid username or password!'
        console.log('Login failed', error.message);
      }
    })
  }
}
