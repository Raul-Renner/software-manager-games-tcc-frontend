import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  save(organization:any): Observable<any>{
    return this.http.post<any>(`${local}/api/org`, organization);
  }

  update(organization:any): Observable<any>{
    return this.http.put<any>(`${local}/api/org/${organization.id}`, organization);
  }

  findBy(field:any, value: any): Observable<any>{
    const params = new HttpParams()
    .append("field", field)
    .append("value", value);
    return this.http.get<any>(`${local}/api/org/find-by`, {params});
  }
}
