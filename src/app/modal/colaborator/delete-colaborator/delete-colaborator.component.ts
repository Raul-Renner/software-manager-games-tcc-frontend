import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-colaborator',
  templateUrl: './delete-colaborator.component.html',
  styleUrls: ['./delete-colaborator.component.sass']
})
export class DeleteColaboratorComponent implements OnInit {

  @Input() content: any;
  @Input() deleteAll: boolean;

  ngOnInit(): void {
  }

  constructor(public activeModal: NgbActiveModal){}
}
