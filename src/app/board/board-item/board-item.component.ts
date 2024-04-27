import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/modal/confirm-modal/confirm-modal.component';
import { CreateActivityComponent } from 'src/app/modal/activity/create-activity/create-activity.component';
import { ViewActivityComponent } from 'src/app/modal/view-activity/view-activity.component';
import { ViewDependenciesComponent } from 'src/app/modal/view-dependencies/view-dependencies.component';
import { UserService } from 'src/app/services/user.service';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.sass']
})
export class BoardItemComponent implements OnInit{

  @Input() item: any;
  @Input() project: any;
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();
  @Output() emitEditCard: EventEmitter<number> = new EventEmitter();
  @Output() emitViewCardFull: EventEmitter<any> = new EventEmitter();
  @Output() emitViewDependenciesCard: EventEmitter<any> = new EventEmitter();

  color: any;
  user: any;

  constructor(
    private modalService: NgbModal,
    public userService: UserService,
    private toast: ToastrModule){}

  ngOnInit(): void {
   this.color = this.item.colorCard !== '#FFFFFF' ? '#FFFFFF' : '#363636';
  }

  onCardDelete(id: number){
    const modalResult = this.modalService.open(ConfirmModalComponent);
    modalResult.componentInstance.content = "Deseja confirmar a deleção da atividade?";
    modalResult.result.then((result) => {
      if(result){
        this.emitDeleteCard.emit(id);
      }
    })
  }

  viewActivity(activity: any): void {
    this.userActivity(activity);
    const modalResult = this.modalService.open(ViewActivityComponent,{size: 'lg', backdrop: 'static'});
    modalResult.componentInstance.activity = activity;
    modalResult.componentInstance.project = this.project[0];
    modalResult.result.then((result) => {
      if(result){
          this.emitViewCardFull.emit(activity);
      }
    })
  }
  onCardEdit(activity: any){
    const modalRef = this.modalService.open(CreateActivityComponent, {size: 'lg', backdrop: 'static'});

    modalRef.componentInstance.activity = activity;
    modalRef.componentInstance.content = this.project[0];

    modalRef.result.then((result) => {
      if(result){
          this.emitEditCard.emit(activity);
      }
    })
  }

  viewDependentCard(activity: any){
    this.userActivity(activity);
    const modalRef = this.modalService.open(ViewDependenciesComponent);

    modalRef.componentInstance.activity = activity;
    modalRef.componentInstance.project = this.project[0];
    modalRef.result.then((result) => {
      if(result){
          this.emitViewDependenciesCard.emit(activity);
      }
    })
  }

  userActivity(activity:any) {
    this.userService.filterUserPerActivityType({
      organizationId: this.userService.organizationId,
      projectId: this.project[0].id,
      activityId: activity.id
    }).subscribe({
      next: (result) => {
       activity.user = result.content[0];
      }
    })
  }
}
