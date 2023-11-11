import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from 'src/app/services/activity.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ActivityDependentService } from 'src/app/services/activity-dependent.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-view-dependencies',
  templateUrl: './view-dependencies.component.html',
  styleUrls: ['./view-dependencies.component.sass']
})
export class ViewDependenciesComponent implements OnInit {

  @Input() activity:any;
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();

  public activityUpdate: Array<any> = [];
  test: any;


  activitiesSource: Array<any> = [];
  activitiesList: Array<any> = [];

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private activityService:ActivityService,
    private activityDependentService: ActivityDependentService){}

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities(){
    this.activitiesList = [];
    this.activityService.findAll().subscribe(resp => {
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
    const modalResult = this.modalService.open(ConfirmModalComponent);
    this.test = ({
      activityDependentIds: this.activityUpdate.filter((element:any) => element.id !== item.idActivityDependentId),
​      colorCard: this.activity.colorCard,
​      description: this.activity.description,
​      estimatedTime: this.activity.estimatedTime,
​      id: this.activity.id,
      identifier: this.activity.identifier,
​      isBlock: this.activity.isBlock,
​      sectorActivityEnum: this.activity.sectorActivityEnum,
​      statusActivityEnum: this.activity.statusActivityEnum,
​      statusPriorityEnum: this.activity.statusPriorityEnum,
​      tagsEnum: this.activity.tagsEnum,
      title: this.activity.title
    })
    modalResult.componentInstance.content = "Deseja confirmar a deleção da atividade dependente?";
    modalResult.result.then((result) => {
      if(result){
        this.activityService.updateActivity(this.test).subscribe(resp =>{
          this.activeModal.close(true);
        });
        this.activityUpdate = [];
      }
    });
  }
}
