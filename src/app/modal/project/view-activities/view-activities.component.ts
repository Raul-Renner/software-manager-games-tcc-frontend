import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrls: ['./view-activities.component.sass']
})
export class ViewActivitiesComponent implements OnInit {

  @Input() isFinished: any;
  @Input() content: any;

  constructor(public activeModal: NgbActiveModal){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
