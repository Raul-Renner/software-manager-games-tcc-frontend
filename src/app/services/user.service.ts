import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';
import { UserFilterType } from '../interfaces/filters';
import { createParams } from './activity-dependent.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  save(user: any): Observable<any> {
    return this.http.post<any>(`${local}/api/org/colaborator`, user);
  }

  update(user: any): Observable<any> {
    return this.http.put<any>(`${local}/api/org/colaborator/${user.id}`, user);
  }

  delete(userId: number): Observable<any> {
    return this.http.delete<any>(`${local}/api/org/colaborator/${userId}`);
  }

  findAllBy(filter: UserFilterType): Observable<any> {
    return this.http.get<any>(`${local}/api/org/colaborator`,{
      params: createParams([filter])
    });
  }
  findBy(field: any, values: any): Observable<any> {
    const params = new HttpParams()
    .append("field", field)
    .append("values", values);
    console.log(params);
    return this.http.get<any>(`${local}/api/org/colaborator/find-by`,{
      params
    });
  }
}
