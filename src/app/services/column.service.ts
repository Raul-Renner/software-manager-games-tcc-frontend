import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  save(column: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.userService.token
    });
    return this.http.post<any>(`/api/org/project/board`, column, {headers: headers});
  }

  update(column: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.userService.token
    });
    return this.http.put<any>(`/api/org/project/board/${column.id}`, column, {headers: headers});
  }

  delete(columnId:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.userService.token
    });
    return this.http.delete<any>(`/api/org/project/board/${columnId}`,
    {
      headers: headers
    });
  }
}
