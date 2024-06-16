import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { local } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private local = '/api/auth/login'; 
  
  login(auth: any, logged: boolean = false): Observable<HttpResponse<any>> {
    return this.http.post(this.local, auth, {
      observe: 'response'
    });
  }
}
