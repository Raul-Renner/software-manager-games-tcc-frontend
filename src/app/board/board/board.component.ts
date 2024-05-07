import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateColumnComponent } from 'src/app/forms/modal/create-column/create-column.component';
import { CreateActivityComponent } from 'src/app/modal/activity/create-activity/create-activity.component';
import { ActivityService } from 'src/app/services/activity.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { ViewColumnsComponent } from 'src/app/forms/modal/view-columns/view-columns.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent  implements OnInit, AfterViewInit {

  public activities: Array<any> = [];
  public activitiesUpdate: Array<any> = [];
  activityUpdate: any;
  public userId: any;
  public projectId: any;
  public project: any;
  public test:any;

  public tagsActivity: Array<any> = [
    {id: 1, name:'URGENTE', tagsEnum:'URGENT'},
    {id: 2, name:'DEPENDENTE', tagsEnum:'DEPENDENT'},
    {id: 3, name:'INDEPENDENTE', tagsEnum:'INDEPENDENT'},
    {id: 4, name:'MELHORIA', tagsEnum:'IMPROVEMENT'}
  ];

  public sectorActivity: Array<any> = [];

  constructor(private activityService:ActivityService,
    private modalService: NgbModal,private elemento: ElementRef,
    private route: ActivatedRoute,
    public user: UserService,
    private projectService: ProjectService,
    private toast: ToastrService
    ){}
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.url[2].path;
    this.userId = this.route.snapshot.url[4].path;
    this.elemento.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFFFF';
    //this.getActivities();
    this.getProject();
  }

  drop(event: CdkDragDrop<any[]>, columnId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
      this.updateSectorCard(event.container.data[event.currentIndex], columnId);

  }

  getProject(): void {
    this.sectorActivity = [];
    this.projectService.findBy({
      projectIds:[this.projectId],
      organizationId: this.user.organizationId
    }).subscribe( resp => {
      this.project = resp.content;
      this.activities = resp.content.activities;
      this.insertColumns(resp.content[0].columnsBoard);
    })
  }

  getActivities(): void {
    this.clearBoardCard();
    this.activityService.findAllBy({
      organizationId: this.user.organizationId,
      projectId: this.projectId
    }).subscribe(resp =>{
      this.activities = resp.content;
    });
  }


  createActivity(): void {
    const modalResult = this.modalService.open(CreateActivityComponent, {size: 'lg', backdrop: 'static'});
    modalResult.componentInstance.content = this.project[0];
    modalResult.result.then((result) => {
      if(result){
          this.toast.success("Atividade cadastrada com sucesso!");

          this.getProject();
      }
    })
  }

  createColumm(): void {
    const modalResult = this.modalService.open(CreateColumnComponent);
    modalResult.componentInstance.content = this.project;
    modalResult.result.then((result) => {
      if(result){
        this.sectorActivity = [];
        this.getProject();
      }
    })
  }

  onDeleteCard(cardId: number, columnId: number){
    this.sectorActivity = this.sectorActivity.map((column: any) => {
      if(column.id === columnId){
        column.activities = column.activities.filter((card: any) => card.id !== cardId);
      }
      return column;
    });
    this.activityService.deleteActivity(cardId).subscribe({
      next: (response: any) => {
        this.toast.success("atividade removida com sucesso!");
        this.getProject();
      },
      error: (response: any) => {
        this.toast.error("Erro ao atualizar a atividade de id: " + cardId);

      }
    });
  }

  clearBoardCard(){
    this.sectorActivity.forEach(sectorActivity =>{
      sectorActivity.list = [];
    })
  }

  onEditCard(cardId: number, columnId: number){
    this.getProject();
  }

  updateSectorCard(activity: any, columnId: number){

    activity.activityDependentList.map((element:any) => {
      this.activitiesUpdate.push({
        ...element,
        activityBranch: activity

      })
    });

    let sector = this.sectorActivity.find(element => element.id === columnId);
    this.activityUpdate = ({
      columnBoardId: columnId,
      projectId: this.projectId,
      activityDependentIds: this.activitiesUpdate,
​      description: activity.description,
​      estimatedTime: activity.estimatedTime,
      usedTime: activity.usedTime,
​      id: activity.id,
      identifier: activity.identifier,
​      isBlock: activity.isBlock,
      isFinished: activity.isFinished,
​      sectorActivity: sector.sectorActivity,
​      statusPriorityEnum: activity.statusPriorityEnum,
​      tagsEnum: activity.tagsEnum,
      title: activity.title
  });
    this.activityService.updateSectorActivity(this.activityUpdate).subscribe({
      next: (response) => {
        // this.toast.success("atividade atualizada com sucesso!");
        this.getProject();
      },
      error: (response) => {
        // this.toast.error("Erro ao atualizar os dados da atividade:" + this.activityUpdate.id);

      }
    });
  }

  updateCard(cardId: number, columnId: number){
    this.sectorActivity = [];
    this.getProject();
  }
  viewActivity(cardId: number, columnId: number){
    this.sectorActivity = [];
    this.getProject();
  }

  viewColunas(){
    const modalResult = this.modalService.open(ViewColumnsComponent, {size: 'lg', backdrop: 'static'});
    modalResult.componentInstance.content = this.project;
    modalResult.result.then((result) => {
      if(result){
        this.getProject();
      }
    });
  }

  insertColumns(columns: any) {
    columns.forEach((column:any) => {
      if(column.phase === 'INITIAL'){
        this.sectorActivity.push(column);
      }
    });
    columns.forEach((column:any) => {
      if(column.phase === 'EXECUTION'){
        this.sectorActivity.push(column);
      }
    });
    columns.forEach((column:any) => {
      if(column.phase === 'FINALIZATION'){
        this.sectorActivity.push(column);
      }
    });
  }

}
