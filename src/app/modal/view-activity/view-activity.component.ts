import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewDependenciesComponent } from '../view-dependencies/view-dependencies.component';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.sass']
})
export class ViewActivityComponent implements OnInit{

  @Input() activity:any;

  @Output() emitViewDependenciesCard: EventEmitter<any> = new EventEmitter();


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal){}
  ngOnInit(): void {
  }

  viewDependentCard(activity: any){
    const modalRef = this.modalService.open(ViewDependenciesComponent);

    modalRef.componentInstance.activity = activity;

    modalRef.result.then((result) => {
      if(result){
          this.emitViewDependenciesCard.emit(activity);
          //alert success
      }
    })
  }

}
