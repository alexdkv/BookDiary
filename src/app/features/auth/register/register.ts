import { AfterViewInit, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRegistrationDTO } from '../../../models/dto/user-registration.dto';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements AfterViewInit{
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  registerForm: FormGroup;

  protected registerFailedUserAlrExists: string | null = null;
  
  constructor(){
    this.registerForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      username: ['',[Validators.required, Validators.minLength(4)]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        confirmPassword: ['', Validators.required]
      },{validators: this.passwordMatchValidator })
    })
  }

  ngAfterViewInit(): void {
    //console.dir(this.registerForm);
  }

  get username(): AbstractControl<any, any> | null {
    return this.registerForm.get('username');
  }
  get email(): AbstractControl<any, any> | null {
    return this.registerForm.get('email');
  }
  get passwords(): FormGroup<any> {
    return this.registerForm.get('passwords') as FormGroup;
  }
  get password(): AbstractControl<any, any> | null {
    return this.passwords.get('password');
  }
  get confirmPassword(): AbstractControl<any, any> | null {
    return this.passwords.get('confirmPassword');
  }

  get isUsernameValid(): boolean {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched) || false;
  }

  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get isPasswordsValid(): boolean {
    return this.passwords?.invalid && (this.passwords?.dirty || this.passwords?.touched) || false;
  }

  get usernameErrorMessage(): string {
    if (this.username?.errors?.['required']) {
      return 'Username is required!';
    }

    if (this.username?.errors?.['minlength']) {
      return 'Username should have at least 4 characters!';
    }

    return '';
  }

  get emailErrorMessage(): string {
    if (this.email?.errors?.['required']) {
      return 'Email is required!';
    }

    if (this.email?.errors?.['pattern']) {
      return 'Email is not valid!';
    }

    return '';
  }

  get passwordErrorMessage(): string {
    if (this.password?.errors?.['required']) {
      return 'Password is required!';
    }

    if (this.password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    if (this.password?.errors?.['pattern']) {
      return 'Password is not valid!';
    }

    if (this.passwords?.errors?.['passwordMismatch']) {
      return 'Passwords do not match!';
    }

    return '';
  }

  get confirmPasswordErrorMessage(): string {
    if (this.confirmPassword?.errors?.['required']) {
      return 'Password is required!';
    }

    if (this.confirmPassword?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    if (this.passwords?.errors?.['passwordMismatch']) {
      return 'Passwords do not match!';
    }

    return '';
  }

  public onRegister(): void{
    if(this.registerForm.invalid) return;
    const{email, username, passwords } = this.registerForm.value;
    const response: UserRegistrationDTO = {
      email, 
      username,
      password: passwords.password,
      confirmPassword: passwords.confirmPassword
    }

    this.authService.registerUser(response).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.markFormGroupTouched();
        const errorMessage = error.error.message;
        console.log(errorMessage);
        
        if(errorMessage.includes('username')){
          this.username?.setErrors({taken: true})
        }
        if(errorMessage.includes('email')){
          this.email?.setErrors({ taken: true });
        }
        this.registerFailedUserAlrExists = errorMessage;
        
        console.error(error.message);
    }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          const nestedControl = control.get(nestedKey)
          nestedControl?.markAllAsTouched();
        })
      } else {
        control?.markAsTouched();
      }
    })
  }

  private passwordMatchValidator(passwordsControl: AbstractControl): ValidationErrors | null {
    const password = passwordsControl.get('password');
    const confirmPassword = passwordsControl.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
