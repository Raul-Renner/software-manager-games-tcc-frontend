import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateActivityComponent } from 'src/app/modal/activity/create-activity/create-activity.component';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent  implements OnInit {

  public activities: Array<any> = [];
  public activitiesUpdate: Array<any> = [];
  activityUpdate: any;

  public labelsColors: Array<any> = [
    {id: 1, title:'Atividade Independente', color:'#FFFFFF'},
    {id: 2, title:'Atividade Dependente', color:'#FFA500'},
    {id: 3, title:'Atividade de Urgência', color:'#DB6262'},
    {id: 4, title:'Atividade de Melhoria', color:'#2F8BF5'},
    {id: 5, title:'Atividade de Finalizada', color:'#107351'}
  ];

  public sectorActivity: Array<any> = [
    {id: 1, name:'PRIORIDADE', sectorActivityEnum:'PRIORITY', list: []},
    {id: 2, name:'PREPARAÇÃO', sectorActivityEnum:'TO_DO', list: []},
    {id: 3, name:'SOFTWARE', sectorActivityEnum:'SOFTWARE', list: []},
    {id: 4, name:'ARTE', sectorActivityEnum:'ART', list: []},
    {id: 5, name:'DESIGN', sectorActivityEnum:'DESIGN', list: []},
    {id: 6, name:'SOM', sectorActivityEnum:'SOUND', list: []},
    {id: 7, name:'INTEGRAÇÃO', sectorActivityEnum:'INTEGRATION', list: []},
    {id: 8, name:'TESTE', sectorActivityEnum:'TEST', list: []},
    {id: 9, name:'FEITO', sectorActivityEnum:'DONE', list: []}
  ];

  constructor(private activityService:ActivityService,
    private modalService: NgbModal,private elemento: ElementRef
    ){}

  ngOnInit(): void {
    this.elemento.nativeElement.ownerDocument.body.style.backgroundColor = '#072047';

    this.getActivities();

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

  getActivities(): void {
    this.clearBoardCard();
    this.activityService.findAll().subscribe(resp =>{
      this.activities = resp.content;
      this.fillBoard();
    });
  }

  fillBoard(){
    if(this.activities.length > 0 && this.activities != null){
      let sectorActivityIndex;
      this.activities.map(activity =>{
        switch(activity.sectorActivityEnum){
          case 'PRIORITY':
            sectorActivityIndex = this.sectorActivity.findIndex((element => element.sectorActivityEnum === activity.sectorActivityEnum));
            this.sectorActivity[sectorActivityIndex].list.push(activity);
            break;
          case 'TO_DO':
           sectorActivityIndex = this.sectorActivity.findIndex((element => element.sectorActivityEnum === activity.sectorActivityEnum));
            this.sectorActivity[sectorActivityIndex].list.push(activity);
            break;
          case 'SOFTWARE':
            sectorActivityIndex = this.sectorActivity.findIndex((element => element.sectorActivityEnum === activity.sectorActivityEnum));
            this.sectorActivity[sectorActivityIndex].list.push(activity);
            break;
          case 'ART':
            sectorActivityIndex = this.sectorActivity.findIndex((element => element.sectorActivityEnum === activity.sectorActivityEnum));
            this.sectorActivity[sectorActivityIndex].list.push(activity);
            break;
          case 'DESIGN':
            sectorActivityIndex = this.sectorActivity.findIndex((element => element.sectorActivityEnum === activity.sectorActivityEnum));
            this.sectorActivity[sectorActivityIndex].list.push(activity);            break;
          case 'SOUND':
            sectorActivityIndex = this.sectorActivity.findIndex((element => element.sectorActivityEnum === activity.sectorActivityEnum));
            this.sectorActivity[sectorActivityIndex].list.push(activity);
            break;
          case 'INTEGRATION':
            sectorActivityIndex = this.sectorActivity.findIndex((element => element.sectorActivityEnum === activity.sectorActivityEnum));
            this.sectorActivity[sectorActivityIndex].list.push(activity);
            break;
          case 'TEST':
            sectorActivityIndex = this.sectorActivity.findIndex((element => element.sectorActivityEnum === activity.sectorActivityEnum));
            this.sectorActivity[sectorActivityIndex].list.push(activity);
            break;
          case 'DONE':
            sectorActivityIndex = this.sectorActivity.findIndex((element => element.sectorActivityEnum === activity.sectorActivityEnum));
            this.sectorActivity[sectorActivityIndex].list.push(activity);
            break;
        }
      });
    }else{
      console.log(";)");
    }
  }

  createActivity(): void {
    const modalResult = this.modalService.open(CreateActivityComponent, {size: 'lg', backdrop: 'static'});
    modalResult.result.then((result) => {
      if(result){
          this.getActivities();
          //alert success
      }
    })
  }

  onDeleteCard(cardId: number, columnId: number){
    this.sectorActivity = this.sectorActivity.map((column: any) => {
      if(column.id === columnId){
        column.list = column.list.filter((card: any) => card.id !== cardId);
      }
      return column;
    });
    this.activityService.deleteActivity(cardId).subscribe(resp =>{
      this.getActivities();
    });
  }

  clearBoardCard(){
    this.sectorActivity.forEach(sectorActivity =>{
      sectorActivity.list = [];
    })
  }

  onEditCard(cardId: number, columnId: number){
    this.getActivities();
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
      activityDependentIds: this.activitiesUpdate,
​      colorCard: activity.colorCard,
​      description: activity.description,
​      estimatedTime: activity.estimatedTime,
​      id: activity.id,
      identifier: activity.identifier,
​      isBlock: activity.isBlock,
​      sectorActivityEnum: sector.sectorActivityEnum,
​      statusActivityEnum: activity.statusActivityEnum,
​      statusPriorityEnum: activity.statusPriorityEnum,
​      tagsEnum: activity.tagsEnum,
      title: activity.title
  })
    this.activityService.updateSectorActivity(this.activityUpdate).subscribe(resp => {
      this.getActivities();
    });
  }

  updateCard(cardId: number, columnId: number){
    this.getActivities();
  }
}
