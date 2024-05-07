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


  constructor(
    public user: UserService,
    public auth: AuthService
  ){}

  ngOnInit(): void {
    this.nameOrganization = this.user.nameOrganization;
  }


  logout(){
    
  }
}
