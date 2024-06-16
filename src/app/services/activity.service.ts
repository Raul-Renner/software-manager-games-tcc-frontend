import { ActivityFilterType } from './../interfaces/filters';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { UserService } from './user.service';
import { createParams } from './activity-dependent.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

  save(activity: any):Observable<ResponseGeneric<any>>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.post<any>(`/api/activity`, activity,
    {headers: headers});
  }

  findAll():Observable<ResponseGeneric<any>>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.get<any>(`/api/activity`,{headers: headers});
  }

  findAllBy(filter: ActivityFilterType):Observable<ResponseGeneric<any>>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.get<any>(`/api/activity/findAllBy`,{
      params: createParams([filter]),
      headers: headers
    });
  }

  deleteActivity(activityId: number):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.delete(`/api/activity/${activityId}`, {headers: headers});
  }
  updateActivity(activity:any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.put(`/api/activity/${activity.id}`, activity, {headers: headers});
  }

  updateSectorActivity(activity:any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.put(`/api/activity/sector-card/${activity.id}`, activity, {headers: headers});
  }

  assignUserInActivity(activity: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.user.token
    });
    return this.http.put<any>(`/api/activity/assign-user-activity/${activity.id}`, activity, {headers: headers});
  }
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
export interface ResponseGeneric<T> {
  content: T;
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  number: number;
  sort: Sort;
  numberOfElements: number;
  size: number;
  empty: boolean;
}
