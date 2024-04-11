import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteColaboratorComponent } from '../../colaborator/delete-colaborator/delete-colaborator.component';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from 'src/app/services/activity.service';
import { DeleteActivityComponent } from '../../activity/delete-activity/delete-activity.component';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrls: ['./view-activities.component.sass']
})
export class ViewActivitiesComponent implements OnInit {

  @Input() isFinished: any;
  @Input() content: any;

  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public user: UserService,
    public toast: ToastrService,
    public activityService: ActivityService){}

  ngOnInit(): void {
    this.filterActivities();
  }

  filterActivities(){
    if(this.isFinished){
      this.content = this.content.filter((activity:any) => activity.isFinished === this.isFinished);
    }
  }

  deleteActivity(activity:any): void {
    const modalResult = this.modalService.open(DeleteActivityComponent);
    modalResult.componentInstance.content = activity;
    modalResult.result.then((result) => {
      if(result){
        this.activityService.deleteActivity(activity.id).subscribe({
          next: () => {
            this.content = this.content.filter((act:any) => act.id != activity.id);
            this.toast.success('Atividade foi removido com sucesso!');
            this.activeModal.close(true);
          },
          error: (error) => {
            this.toast.error(`Ocorreu um ao remover o usuário: ${activity.title}`);
          }
        })
      }
    })
  }


}
