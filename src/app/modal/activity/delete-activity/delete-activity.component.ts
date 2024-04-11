import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-activity',
  templateUrl: './delete-activity.component.html',
  styleUrls: ['./delete-activity.component.sass']
})
export class DeleteActivityComponent implements OnInit {

  @Input() content: any;

  ngOnInit(): void {
  }

  constructor(public activeModal: NgbActiveModal){}

}
