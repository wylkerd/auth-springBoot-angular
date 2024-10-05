import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/auth/login/login.component";
import { InitialPageComponent } from "./pages/initial-page/initial-page.component";
import { loginGuard } from "./shared/guards/login.guard";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', redirectTo: 'initial', pathMatch: 'full' },
  {
    path: 'initial',
    component: InitialPageComponent,
    canActivate: [loginGuard],
    canActivateChild: [loginGuard]
  }
];
