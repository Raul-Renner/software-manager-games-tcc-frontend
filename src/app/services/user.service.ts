import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { local } from 'src/environments/environment';
import { UserFilterType } from '../interfaces/filters';
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

  constructor(private http: HttpClient) {
    const storage = sessionStorage.getItem("currentUser") ? sessionStorage : localStorage;
    const data = JSON.stringify(storage.getItem("currentUser"));
    !!data ? (() => {

    // this.userId = data.userId;
    // this.login = data.login.trim();
    // this.profile = data.profile;
    // this.token = data.token;
    // this.userInformationId = data.userInformation.id;
    // this.email = data.userInformation.email;
    // this.name = data.userInformation.name;
    // this.username = data.userInformation.username;
    // this.fullName = `${data.userInformation.name} ${data.userInformation.username}`;

    // this.organizationId = data.organization.id;
    // this.name = data.organization.name;
    // this.description = data.organization.description;
    // this.emailOrg = data.organization.email;
    // this.projects = data.organization.projects;

    }) : this.setLoggedIn(false);
   }

  save(user: any): Observable<any> {
    return this.http.post<any>(`${local}/api/org/colaborator`, user);
  }

  update(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<any>(`${local}/api/org/colaborator/${user.id}`, user, { headers: headers });
  }

  delete(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<any>(`${local}/api/org/colaborator/${userId}`,{headers: headers});
  }

  findAllBy(filter: UserFilterType): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<any>(`${local}/api/org/colaborator`,{
      params: createParams([filter]),
      headers: headers
    });
  }
  findBy(field: any, values: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
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
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<any>(`${local}/api/org/colaborator/update-user-function/${user.id}`, user, { headers: headers });
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    const storage = sessionStorage.getItem("currentUser") ? sessionStorage : localStorage;
    const session = JSON.parse(storage.getItem("currentUser") || '{}');
    return this.loggedInStatus && !!session;
  }
}
