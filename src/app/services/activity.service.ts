import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http: HttpClient
  ) { }

  save(activity: any):Observable<ResponseGeneric<any>>{
    return this.http.post<any>(`${local}/api/activity`, activity);
  }

  findAll():Observable<ResponseGeneric<any>>{
    return this.http.get<any>(`${local}/api/activity`,{});
  }

  deleteActivity(activityId: number):Observable<any>{
    return this.http.delete(`${local}/api/activity/${activityId}`);
  }
  updateActivity(activity:any): Observable<any>{
    return this.http.put(`${local}/api/activity/${activity.id}`, activity);
  }

  updateSectorActivity(activity:any): Observable<any>{
    return this.http.put(`${local}/api/activity/sector-card/${activity.id}`, activity);
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
