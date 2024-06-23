import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  passwordMask: any;
  show = false;
  login: any;
  password: any;
  storage: any;

  constructor(
    private elemento: ElementRef,
    private router: Router,
    private authService: AuthService,
    private userCurrent: UserService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService){
      this.login = '';
      this.password = '';
      this.storage = sessionStorage.getItem("currentUser") ? sessionStorage : localStorage;
  }


  ngOnInit(): void {
    this.passwordMask = 'password';
    this.elemento.nativeElement.ownerDocument.body.style.backgroundColor = '#072047';
  }

  updateVisibilityPassword(){
    if (this.passwordMask === 'password') {
      this.passwordMask = 'text';
      this.show = true;
    } else {
      this.passwordMask = 'password';
      this.show = false;
    }
  }

  goAddOrg(){
    this.router.navigateByUrl("add_organization");
  }

  onLogin(){
    this.spinner.show();
    this.authService.login({login: this.login, password: this.password}).subscribe( resp => {

      const { body } = resp;
      this.configurationUserLogin(body);
      this.navigationHomeUerProfile();
      this.spinner.hide();
    }, err => {
      if(err.status = 401){
        this.toast.error('Usuário e/ou senha inválidos. Verifique o usuário e senha e tente novamente.');
      } else {
        this.toast.error(err.error);
      }
      this.spinner.hide();
      this.password = '';
    });
  }




  private configurationUserLogin(body: any) {

    this.userCurrent.userId = body.user.id;
    this.userCurrent.login = body.user.login.trim();
    this.userCurrent.profile = body.user.profile;

    this.userCurrent.token = body.token;

    this.userCurrent.userInformationId = body.user.userInformation.id;
    this.userCurrent.email = body.user.userInformation.email;
    this.userCurrent.name = body.user.userInformation.name;
    this.userCurrent.username = body.user.userInformation.username;
    this.userCurrent.fullName = `${body.user.userInformation.name} ${body.user.userInformation.username}`;

    this.userCurrent.organizationId = body.user.organization.id;
    this.userCurrent.nameOrganization = body.user.organization.name;
    this.userCurrent.descriptionOrganization = body.user.organization.description;
    this.userCurrent.emailOrg = body.user.organization.email;
    this.userCurrent.projects = body.user.organization.projects;

    this.userCurrent.setLoggedIn(true);
  }

  private navigationHomeUerProfile(){
    switch(this.userCurrent.profile){
      case "ADMINISTRADOR":
        this.userCurrent.pathHome = "/home-admin";
        break;
      case "DESENVOLVEDOR":
        this.userCurrent.pathHome = "/home";
        break;
      case "GERENTE":
        this.userCurrent.pathHome = "/home-admin";
        break;
      case "LIDER_TECNICO":
        this.userCurrent.pathHome = "/home";
        break;
      case "TESTADOR":
        this.userCurrent.pathHome = "/home";
        break;
    }
    this.storage.setItem('currentUser', JSON.stringify(this.userCurrent));
    this.router.navigate([this.userCurrent.pathHome]);
  }
}
