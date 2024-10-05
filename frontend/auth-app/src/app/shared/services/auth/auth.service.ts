import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import moment from 'moment';
import { UserService } from '../user/user.service';
import { IEStorageKey } from "../../interfaces";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = environment.apiBaseUrl;
  router = inject(Router);
  http = inject(HttpClient);
  storageService = inject(StorageService);
  userService = inject(UserService)
  currentStatus!: boolean

  login(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiBaseUrl}/auth/login`, body)
      .pipe(
        tap({
          next: ({ token }) => {
            this.storageService.setLocal(IEStorageKey.TOKEN, token);
          },
        })
      );
  }

  logout() {
    this.storageService.cleanLocal();
    this.router.navigate(['/login']);
  }

  token() {
    return this.storageService.returnTokenLocal<string>(IEStorageKey.TOKEN);
  }

  tokenPayload() {
    const token = this.storageService.returnTokenLocal<string>(IEStorageKey.TOKEN);
    if (!token) {
      return undefined;
    }

    const tokenPayload: any = jwtDecode(token);
    return tokenPayload;
  }

  currentUser() {
    const tokenData = this.tokenPayload();
    if (!tokenData) {
      return null;
    }

    const user = {
      id: tokenData?.id,
      name: tokenData?.name,
      email: tokenData?.email,
      localName: tokenData?.localName,
      role: tokenData?.role,
    };
    return user;
  }

  isAuthenticatedAndTokenValid() {
    const tokenData = this.tokenPayload();
    this.currentStatus = false;

    if (!tokenData || tokenData == undefined) {
      this.logout();
      return false;
    }

    const isNow = moment();
    const dateExpiration = moment.unix(tokenData?.exp);
    const isExpired = isNow.isSameOrAfter(dateExpiration);

    if (isExpired) {
      this.logout();
      return false;
    }
    return true;
  }

  isAuthenticatedAndAdmin() {
    const tokenData = this.tokenPayload();
    if (!tokenData || tokenData == undefined || tokenData?.role !== 'Admin') {
      this.logout();
      return false;
    }
    return true;
  }
  sendMail(email: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiBaseUrl}/Users/SendEmail`,
      { email }
    );
  }

  resetPassword(password: string, token: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiBaseUrl}/Users/ResetPassword`,
      { password, token }
    );
  }
}
