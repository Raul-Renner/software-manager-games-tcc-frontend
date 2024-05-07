import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {

  @Input() head: any;
  @Input() label: any;

  @Input() infor: any;
  @Input() subInfor: any;
  @Input() infor3: any;

  ngOnInit(): void {

  }
  constructor(public activeModal: NgbActiveModal){}

}
