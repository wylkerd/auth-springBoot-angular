import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // public createUser(user: FormData): Observable<GenericApiResponse<User>> {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   return this.http
  //     .post<GenericApiResponse<User>>(`${this.baseUrl}/auth/register`, user)
  // }
}
