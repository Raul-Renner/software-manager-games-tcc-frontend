import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from 'src/app/services/activity.service';
import { DeleteComponent } from 'src/app/forms/modal/delete/delete.component';

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
    const modalResult = this.modalService.open(DeleteComponent);
    modalResult.componentInstance.head = "Deseja excluir a seguinte atividade?";
    modalResult.componentInstance.label = "Status";
    modalResult.componentInstance.info = activity.identifier;
    modalResult.componentInstance.subInfor = activity.title;
    modalResult.componentInstance.infor3 = activity.sectorActivity;

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
