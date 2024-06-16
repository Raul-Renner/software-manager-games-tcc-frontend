import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any>{

    return this.http.get<any>(`/api/profiles`);
  }
}
