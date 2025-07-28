import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: 
  [ 
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('book-diary-fe');

  protected authService = inject(AuthService);
  private router = inject(Router);
 
  public isLoggedIn = this.authService.isLoggedIn;
  public currentUser = this.authService.currentUser;


  public onLogout(): void{
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }
}
