import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';
import { ProjectFilterType } from '../interfaces/filters';
import { createParams } from './activity-dependent.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }


  save(project:any): Observable<any>{
    return this.http.post<any>(`${local}/api/org/project`, project);
  }

  update(project:any): Observable<any>{
    return this.http.put<any>(`${local}/api/org/project/${project.id}`, project);
  }

  delete(projectId:number): Observable<any>{
    return this.http.delete<any>(`${local}/api/org/project/${projectId}`);
  }


  findBy(filter: ProjectFilterType): Observable<any>{
    return this.http.get<any>(`${local}/api/org/project/findAllBy`, {
      params: createParams([filter]),
    });
  }

}
