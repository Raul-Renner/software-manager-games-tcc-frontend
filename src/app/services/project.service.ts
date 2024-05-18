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
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.post<any>(`${local}/api/org/project`, project,
    {headers: headers});
  }

  update(project:any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.put<any>(`${local}/api/org/project/${project.id}`, project,
    {headers: headers});
  }

  updateDescAndTitle(project:any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.put<any>(`${local}/api/org/project/update-titleAndDesc/${project.id}`, project,
    {headers: headers});
  }


  delete(projectId:number): Observable<any>{
    const userStorage = localStorage.getItem("currentUser") || null; 
    const currentUser = JSON.parse(userStorage!); 
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.delete<any>(`${local}/api/org/project/${projectId}`,
    {
      headers: headers
    });
  }


  findBy(filter: ProjectFilterType): Observable<any>{
    const userStorage = localStorage.getItem("currentUser") || null; 
    const currentUser = JSON.parse(userStorage!); 
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + currentUser.token
    });
    return this.http.get<any>(`${local}/api/org/project/findAllBy`,
    {params: createParams([filter]),
      headers: headers
    });
  }
}
