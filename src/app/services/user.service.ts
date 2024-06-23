import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';
import { UserFilterPerActivityType, UserFilterType } from '../interfaces/filters';
import { createParams } from './activity-dependent.service';
import { UserEntity } from '../interfaces/UserEntity';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedInStatus: boolean = false;
  public userId: number;
  public login: string;
  public profile: string;
  public userInformationId: number;
  public name: string;
  public username: string;
  public email: string;
  public fullName: string;
  public organizationId: number;
  public nameOrganization: string;
  public descriptionOrganization: string;
  public emailOrg: string;
  public projects: any;
  public pathHome: string = '';
  public token: string;
  public currentUser: any;

  constructor(private http: HttpClient) {

  }


  save(user: any): Observable<any> {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  currentUser.token
    });
    return this.http.post<any>(`${local}/api/org/colaborator`, user, {headers: headers});
  }

  update(user: any): Observable<any> {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  currentUser.token
    });
    return this.http.put<any>(`${local}/api/org/colaborator/${user.id}`, user, { headers: headers });
  }

  delete(userId: number): Observable<any> {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  currentUser.token
    });
    return this.http.delete<any>(`${local}/api/org/colaborator/${userId}`,{headers: headers});
  }

  findAllBy(filter: UserFilterType): Observable<any> {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  currentUser.token
    });
    return this.http.get<any>(`${local}/api/org/colaborator`,{
      params: createParams([filter]),
      headers: headers
    });
  }
  findBy(field: any, values: any): Observable<any> {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  currentUser.token
    });
    const params = new HttpParams()
    .append("field", field)
    .append("values", values);
    return this.http.get<any>(`${local}/api/org/colaborator/find-by`,{
      params,
      headers
    });
  }

  updateProjectsAndProfile(userId:number, user: any): Observable<any> {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  currentUser.token
    });
    return this.http.put<any>(`${local}/api/org/colaborator/update-user-function/${userId}`, user, { headers: headers });
  }


  filterUserPerActivityType(filter: UserFilterPerActivityType): Observable<any> {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +  currentUser.token
    });
    return this.http.get<any>(`${local}/api/org/colaborator/find-by-activity`,{
      params: createParams([filter]),
      headers: headers
    });
  }


  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    const storage = localStorage.getItem("currentUser") ? localStorage : localStorage;
    const session = JSON.parse(storage.getItem("currentUser") || '{}');
    return this.loggedInStatus && !!session;
  }

  signOut() {
    this.setLoggedIn(false);
    sessionStorage.clear();
    localStorage.clear();
  }
}
