import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit{
  public navbarOpen = false;
  public nameOrganization: string;
  public user: any;

  constructor(
    public userService: UserService,
    public auth: AuthService
  ){}

  ngOnInit(): void {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    this.user = currentUser;
    this.nameOrganization = this.user.nameOrganization;
  }


  logout(){

  }
}
