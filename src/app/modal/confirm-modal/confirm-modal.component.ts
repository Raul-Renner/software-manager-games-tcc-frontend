import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass']
})
export class ConfirmModalComponent implements OnInit{

  @Input() title: any;
  @Input() content: any;

  constructor(public activeModal: NgbActiveModal){}

  ngOnInit(): void {
  }

}

