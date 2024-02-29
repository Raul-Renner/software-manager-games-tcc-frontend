import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redefine-password',
  templateUrl: './redefine-password.component.html',
  styleUrls: ['./redefine-password.component.sass']
})
export class RedefinePasswordComponent implements OnInit{

  password: any;
  confirm_password: any;
  show = false;
  show_confirm_password = false;

  ngOnInit(): void {

  }

  constructor(private router: Router){}

  updateVisibilityPassword(flag: boolean){
    if(flag){
      if (this.password === 'password') {
        this.password = 'text';
        this.show = true;
      } else {
        this.password = 'password';
        this.show = false;
      }
    }else{
      if (this.confirm_password === 'password') {
        this.confirm_password = 'text';
        this.show_confirm_password = true;
      } else {
        this.confirm_password = 'password';
        this.show_confirm_password = false;
      }
    }
  }
}
