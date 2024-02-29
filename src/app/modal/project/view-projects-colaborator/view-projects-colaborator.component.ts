import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-projects-colaborator',
  templateUrl: './view-projects-colaborator.component.html',
  styleUrls: ['./view-projects-colaborator.component.sass']
})
export class ViewProjectsColaboratorComponent implements OnInit {

  @Input() content: any;

  constructor(public activeModal: NgbActiveModal){}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
