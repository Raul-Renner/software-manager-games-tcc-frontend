import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logged-organization',
  templateUrl: './logged-organization.component.html',
  styleUrls: ['./logged-organization.component.sass'],
})
export class LoggedOrganizationComponent implements OnInit {
  password: any;
  confirm_password: any;
  show = false;
  show_confirm_password = false;
  public buttonDisabled: boolean = false;

  public organizationForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    // login: new FormControl(null, Validators.required),
    // password: new FormControl(null, Validators.required),
    // confirm_password: new FormControl(null, Validators.required),
  });
  constructor(
    private elemento: ElementRef,
    private organizationService: OrganizationService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.elemento.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFFFF';

    this.password = 'password';
    this.confirm_password = 'password';
  }

  updateVisibilityPassword(flag: boolean) {
    if (flag) {
      if (this.password === 'password') {
        this.password = 'text';
        this.show = true;
      } else {
        this.password = 'password';
        this.show = false;
      }
    } else {
      if (this.confirm_password === 'password') {
        this.confirm_password = 'text';
        this.show_confirm_password = true;
      } else {
        this.confirm_password = 'password';
        this.show_confirm_password = false;
      }
    }
  }
  save(){
    this.organizationService.save(this.organizationForm.value).subscribe({

      next: (resp) => {
      this.toastr.success('O cadastro da sua organização foi realizada com sucesso!','Cadastro realizado!');
      this.organizationForm.reset();
      setTimeout(() => {
        this.router.navigateByUrl("login");
      }, 2000);
      //   const organization = {
      //     email: this.organizationForm.value.email,
      //     login: this.organizationForm.value.login,
      //     name:  this.organizationForm.value.name,
      //     username: this.organizationForm.value.name,
      //     organizationId: resp.id,
      //     profileEnum: "ADMINISTRADOR",

      //   }
        // this.userService.save(organization).subscribe({
        //   next: (response) => {

        //   }
         //})
      },
      error: (response) => {
        this.toastr.error('Erro ao cadastrar sua organização!');

      }
    })
  }
}
