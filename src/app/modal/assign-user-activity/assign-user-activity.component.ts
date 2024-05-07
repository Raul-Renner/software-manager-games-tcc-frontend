import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-user-activity',
  templateUrl: './assign-user-activity.component.html',
  styleUrls: ['./assign-user-activity.component.sass']
})
export class AssignUserActivityComponent implements OnInit{

  @Input() activity: any;


  constructor(public activeModal: NgbActiveModal){}
  ngOnInit(): void {
  }

}
