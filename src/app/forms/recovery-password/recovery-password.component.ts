import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.sass']
})
export class RecoveryPasswordComponent implements OnInit{
  ngOnInit(): void {

  }

  constructor(private router: Router){}

}
