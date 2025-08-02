import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  protected authService = inject(AuthService);
  private router = inject(Router);
 
  public isLoggedIn = this.authService.isLoggedIn;
  public currentUser = this.authService.currentUser;


  public onLogout(): void{
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }
}
