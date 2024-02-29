import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.sass']
})
export class DeleteProjectComponent implements OnInit {

  @Input() content: any;

  ngOnInit(): void {
  }

  constructor(public activeModal: NgbActiveModal){}

}
