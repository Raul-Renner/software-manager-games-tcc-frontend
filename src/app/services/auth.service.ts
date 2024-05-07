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

  login(auth: any, logged: boolean = false): Observable<HttpResponse<any>> {
    return this.http.post(`${local}/api/auth/login`, auth, {
      observe: "response",
      headers: new HttpHeaders({"Content-type": "application/json", "Logged": logged.toString() })
    });
  }
}
