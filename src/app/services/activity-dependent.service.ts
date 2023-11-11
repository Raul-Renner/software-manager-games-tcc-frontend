import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';
import { ResponseGeneric } from './activity.service';
import { ActivityDependentFilterType } from '../interfaces/filters';
@Injectable({
  providedIn: 'root'
})
export class ActivityDependentService {

  constructor(private http: HttpClient) { }

  findAll(filter: any):Observable<any>{
    return this.http.get<any>(`${local}/api/activity-dependent`,{
      params: createParams([filter]),
    });
  }
  
  deleteActivity(activityDependentId: number):Observable<any>{
    return this.http.delete(`${local}/api/activity-dependent/${activityDependentId}`)
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
