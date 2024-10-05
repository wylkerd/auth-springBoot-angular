import { Component, inject } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "../reset-password/reset-password.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { InputTypesComponent } from "../../../shared/components/molecules/input-component/input-component-component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, InputTypesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;
  fb = inject(FormBuilder)
  dialog = inject(MatDialog)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  authService = inject(AuthService)
  isSubmitted = false
  errorMessage: string = ''

  get fc() {
    return this.form.controls
  }
  openForgotPasswordModal(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '500px',
    });
  }
  openResetPasswordModal(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      disableClose: true
    });
  }
  private _validateResetPassword() {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if(queryParams['token']) {
      this.openResetPasswordModal()
    }
  }
  private _initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  private _validacaoToken() {
    if (this.authService.isAuthenticatedAndTokenValid()) {
      this.router.navigate(['']);
    }
  }

  protected onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      this.errorMessage = 'Login ou senha inválidos. Tente novamente.';
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (errorResponse: any) => {
        if (errorResponse.status === 400 && errorResponse?.error && errorResponse.error?.message) {
          this.errorMessage = errorResponse.error?.message;
        } else {
          this.errorMessage = 'Não foi possível realizar o Login!';
        }
      }
    });
  }

  ngOnInit(): void {
    this._initForm()
    this._validateResetPassword()
    this._validacaoToken()
  }
}
