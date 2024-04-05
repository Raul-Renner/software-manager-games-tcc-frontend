import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';
import { ProjectFilterType } from '../interfaces/filters';
import { createParams } from './activity-dependent.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private user: UserService) { }


  save(project:any): Observable<any>{
    return this.http.post<any>(`${local}/api/org/project`, project);
  }

  update(project:any): Observable<any>{
    return this.http.put<any>(`${local}/api/org/project/${project.id}`, project);
  }

  delete(projectId:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.delete<any>(`${local}/api/org/project/${projectId}`,
    {
      observe: "response",
      headers: headers
    });
  }


  findBy(filter: ProjectFilterType): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.get<any>(`${local}/api/org/project/findAllBy`,
    {params: createParams([filter]),
      observe: "response",
      headers: headers
    });
  }
}
