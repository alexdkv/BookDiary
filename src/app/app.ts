import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';


@Component({
  selector: 'app-root',
  imports: 
  [ 
    RouterOutlet,
    RouterModule,
    CommonModule,
    Header,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('book-diary-fe');

}
