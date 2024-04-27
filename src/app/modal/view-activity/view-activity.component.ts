import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewDependenciesComponent } from '../view-dependencies/view-dependencies.component';
import { UserService } from 'src/app/services/user.service';
import { ActivityService } from 'src/app/services/activity.service';
import { AssignUserActivityComponent } from '../assign-user-activity/assign-user-activity.component';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.sass']
})
export class ViewActivityComponent implements OnInit{

  @Input() activity:any;

  @Input() project:any;

  @Output() emitViewDependenciesCard: EventEmitter<any> = new EventEmitter();

  activityEntity: any;
  userVO:any;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public userService: UserService,
    private activityService: ActivityService){}
  ngOnInit(): void {

  }

  assignUserActivity(activity: any){
    const modalRef = this.modalService.open(AssignUserActivityComponent);
    modalRef.componentInstance.activity = activity;

    modalRef.result.then((result) => {
      if(result){

        this.userVO = {
          id: this.userService.userId
        }
        activity.userSaveVO = this.userVO
        this.activityService.assignUserInActivity(activity).subscribe({
          next: (response) => {
            this.userActivity(activity);
          },
          error: (response) => {
          }
        })
      }
    })
  }

  userActivity(activity:any) {
    this.userService.filterUserPerActivityType({
      organizationId: this.userService.organizationId,
      projectId: this.project.id,
      activityId: activity.id
    }).subscribe({
      next: (result) => {
       this.activity.user = result.content[0];
      }
    })
  }

  viewDependentCard(activity: any){
    const modalRef = this.modalService.open(ViewDependenciesComponent);

    modalRef.componentInstance.activity = activity;
    modalRef.componentInstance.project = this.project;

    modalRef.result.then((result) => {
      if(result){
          this.emitViewDependenciesCard.emit(activity);


          this.activityService.findAllBy({
            activityId: activity.id
          }).subscribe({
            next: (response) => {
              let column = this.project.columnsBoard.filter((column:any) => column.sectorActivity === activity.sectorActivity)
              if(activity.user != null && activity.user != undefined){
                this.userVO = {
                  id: this.activity.user.id
                }
              }
              let activityEntity = ({
                ...response.content[0],
                columnBoardId: column[0].id,
                projectId: this.project.id,
                userSaveVO: this.userVO != null && this.userVO != undefined ? this.userVO : null
              })
              this.activityService.updateActivity(activityEntity).subscribe({
                next: (response) => {
                  this.activity = activityEntity;
                }
              });
            }
          });
      }
    })
  }

}
