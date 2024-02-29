import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-colaborators',
  templateUrl: './view-colaborators.component.html',
  styleUrls: ['./view-colaborators.component.sass']
})
export class ViewColaboratorsComponent implements OnInit {

  @Input() content: any;

  constructor(public activeModal: NgbActiveModal){

  }

  ngOnInit(): void {
  }

}
