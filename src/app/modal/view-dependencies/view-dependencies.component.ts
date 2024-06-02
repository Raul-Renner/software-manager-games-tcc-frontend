import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from 'src/app/services/activity.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ActivityDependentService } from 'src/app/services/activity-dependent.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-dependencies',
  templateUrl: './view-dependencies.component.html',
  styleUrls: ['./view-dependencies.component.sass']
})
export class ViewDependenciesComponent implements OnInit {

  @Input() activity:any;
  @Input() project:any;
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();

  public activityUpdate: Array<any> = [];
  activityEntity: any;
  userVO: any;
  user: any;

  activitiesSource: Array<any> = [];
  activitiesList: Array<any> = [];

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private activityService:ActivityService,
    public toast: ToastrService,
    private activityDependentService: ActivityDependentService){}

  ngOnInit(): void {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    this.user = currentUser;
    this.getActivities();
  }

  getActivities(){
    this.activitiesList = [];
    this.activityService.findAllBy({
      organizationId: this.user.organizationId,
      projectId: this.project.id
    }).subscribe(resp => {
      this.activitiesList = resp.content;
      this.viewListingDependencies();
    });
  }

  viewListingDependencies(){
    this.activitiesSource = [];
    this.activity.activityDependentList.map((element:any) => {
      let activitySource = this.activitiesList.find((activity:any) => element.activitySource == activity.id);
      this.activitiesSource.push({
        ...activitySource,
        idActivityDependentId: element.id,
      });

      this.activityUpdate.push({
        ...element,
        activityBranch: this.activity
      })
    });
  }

  onCardDelete(item: any){
    let column = this.project.columnsBoard.filter((column:any) => column.sectorActivity === this.activity.sectorActivity);
    if(this.activity.user != null && this.activity.user != undefined){
      this.userVO = {
        id: this.activity.user.id
      }
    }
    const modalResult = this.modalService.open(ConfirmModalComponent);
    this.activityEntity = ({
      ...this.activity,
      columnBoardId: column[0].id,
      projectId: this.project.id,
      userSaveVO: this.userVO != null && this.userVO != undefined ? this.userVO : null,
      activityDependentIds: this.activityUpdate.filter((element:any) => element.id !== item.idActivityDependentId),

  })
    modalResult.componentInstance.content = "Deseja confirmar a deleção da atividade dependente?";
    modalResult.result.then((result) => {
      if(result){
        this.activityService.updateActivity(this.activityEntity).subscribe({
          next: () => {
            this.toast.success(`Atividade dependente com id: ${item.id} removida com sucesso`);
            this.activeModal.close(true);
          }
        });
        this.activityUpdate = [];
      }
    });
  }
}
