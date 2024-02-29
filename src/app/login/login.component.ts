import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  password: any;
  show = false;

  ngOnInit(): void {
    this.password = 'password';
    this.elemento.nativeElement.ownerDocument.body.style.backgroundColor = '#072047';

  }

  constructor(private elemento: ElementRef,  private router: Router){}

  updateVisibilityPassword(){
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  goAddOrg(){
    this.router.navigateByUrl("add_organization");
  }

}
