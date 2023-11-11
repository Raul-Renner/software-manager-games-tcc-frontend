import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityDependentFilterType } from 'src/app/interfaces/filters';
import { ConfirmModalComponent } from 'src/app/modal/confirm-modal/confirm-modal.component';
import { CreateActivityComponent } from 'src/app/modal/create-activity/create-activity.component';
import { ActivityDependentService } from 'src/app/services/activity-dependent.service';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit{
  public activities:Array<any> = new Array();

  constructor(
    private activityService:ActivityService,
    private activityDependentService: ActivityDependentService,
    private modalService: NgbModal
  ){

  }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities(): void {
    this.activityService.findAll().subscribe(resp =>{
      this.activities = resp.content;
    });
  }

  createActivity(): void {
    const modalResult = this.modalService.open(CreateActivityComponent);
    modalResult.result.then((result) => {
      if(result){
          this.getActivities();
          //alert success
      }
    })
  }

  deleteActivity(activity: any):void {
    const modalResult = this.modalService.open(ConfirmModalComponent);
    modalResult.componentInstance.content = "Deseja confirmar a deleção da atividade?";
    modalResult.result.then((result) => {
      if(result){
        this.activityService.deleteActivity(activity.id).subscribe(resp =>{
          this.getActivities();
          //alert success
        })
      }
    })
  }
  editarActivity(activity: any): void{
    const modalRef = this.modalService.open(CreateActivityComponent);

    modalRef.componentInstance.activity = activity;

    modalRef.result.then((result) => {
      if(result){
          this.getActivities();
          //alert success
      }
    })
  }

}
