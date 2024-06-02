import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class ActivityDependentService {

  constructor(
    private http: HttpClient,
    private user: UserService) { }

  findAll(filter: any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.get<any>(`${local}/api/activity-dependent`,{
      params: createParams([filter]),
      headers: headers
    });
  }

  deleteActivity(activityDependentId: number):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.delete(`${local}/api/activity-dependent/${activityDependentId}`, {headers: headers})
  }

}

export const createParams = (objects: any[]) => {
  let params = new HttpParams();
  objects.forEach(o => {
    if(o) {
      Object.keys(o).forEach(key => {
        if(o[key] || o[key] === false) {
          params = params.append(key, o[key]);
        }
      })
    }
  })
  return params;
}



export interface PageRequest {
  offset?: number;
  limit?: number;
  order?: string;
  sortBy?: string[];
}
