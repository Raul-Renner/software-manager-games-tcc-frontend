import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/modal/confirm-modal/confirm-modal.component';
import { CreateActivityComponent } from 'src/app/modal/create-activity/create-activity.component';
import { ViewActivityComponent } from 'src/app/modal/view-activity/view-activity.component';
import { ViewDependenciesComponent } from 'src/app/modal/view-dependencies/view-dependencies.component';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.sass']
})
export class BoardItemComponent implements OnInit{

  @Input() item: any;
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();
  @Output() emitEditCard: EventEmitter<number> = new EventEmitter();
  @Output() emitViewCardFull: EventEmitter<number> = new EventEmitter();
  @Output() emitViewDependenciesCard: EventEmitter<any> = new EventEmitter();

  color: any;

  constructor(private modalService: NgbModal){

  }

  ngOnInit(): void {
   this.color = this.item.colorCard !== '#FFFFFF' ? '#FFFFFF' : '#363636';
  }

  onCardDelete(id: number){
    const modalResult = this.modalService.open(ConfirmModalComponent);
    modalResult.componentInstance.content = "Deseja confirmar a deleção da atividade?";
    modalResult.result.then((result) => {
      if(result){
        this.emitDeleteCard.emit(id);
          //alert success
      }
    })
  }

  viewActivity(activity: any): void {
    const modalResult = this.modalService.open(ViewActivityComponent);
    modalResult.componentInstance.activity = activity;
    modalResult.result.then((result) => {
      if(result){
          this.emitViewCardFull.emit(activity);
          //alert success
      }
    })
  }
  onCardEdit(activity: any){
    const modalRef = this.modalService.open(CreateActivityComponent);

    modalRef.componentInstance.activity = activity;

    modalRef.result.then((result) => {
      if(result){
          this.emitEditCard.emit(activity);
          //alert success
      }
    })
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
