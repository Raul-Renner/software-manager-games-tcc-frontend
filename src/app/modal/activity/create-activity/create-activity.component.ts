import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivityDependentService } from 'src/app/services/activity-dependent.service';
import { ActivityService } from 'src/app/services/activity.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.sass']
})
export class CreateActivityComponent implements OnInit, AfterViewInit{
   @Input() content:any;
  public sectorActivity: Array<any> = [];


  public statusPriorityActivity: Array<any> = [
    {id: 1, name:'BAIXA', statusPriorityEnum:'LOW'},
    {id: 2, name:'MÉDIA', statusPriorityEnum:'MEDIUM'},
    {id: 3, name:'ALTA', statusPriorityEnum:'HIGH'}
  ];

  public estimatedTimeList: Array<any> = [
    {id: 1, name:'2h'},
    {id: 2, name:'4h'},
    {id: 3, name:'6h'},
    {id: 1, name:'1d 2h'},
    {id: 1, name:'1d 4h'},
    {id: 1, name:'1d 6h'},
    {id: 2, name:'2d'},
    {id: 2, name:'2d 2h'},
    {id: 2, name:'2d 4h'},
    {id: 2, name:'2d 6h'},
    {id: 3, name:'3d'},
  ];

  public tagsActivity: Array<any> = [
    {id: 1, name:'URGENTE', tagsEnum:'URGENT'},
    {id: 2, name:'DEPENDENTE', tagsEnum:'DEPENDENT'},
    {id: 3, name:'INDEPENDENTE', tagsEnum:'INDEPENDENT'},
    {id: 4, name:'MELHORIA', tagsEnum:'IMPROVEMENT'}
  ];

  public owner: Array<any> = [];
  @Input() activity:any;
  @Input() activitiesSource: Array<any> = [];

  public buttonDisabled : boolean = false;
  public activitiesList: Array<any> = [];
  public activitiesDependentsList: Array<any> = [];
  public activitiesDependentsListUpdate: Array<any> | undefined;
  public colaborators: Array<any> = [];
  public userSaveVO: any;



  public formActivity:FormGroup = new FormGroup ({
    id: new FormControl(null),
    identifier: new FormControl(null),
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    estimatedTime: new FormControl(null),
    usedTime: new FormControl(null),
    sectorActivity: new FormControl(null, Validators.required),
    userSelect: new FormControl(null),
    statusPriorityActivity: new FormControl(""),
    tagsActivity: new FormControl(""),
    isBlock: new FormControl(false),
    activityDependentIds: new FormControl([]),
  });

  constructor(
    private activityService: ActivityService,
    private activityDependentService: ActivityDependentService,
    public activeModal: NgbActiveModal,
    public user: UserService,
    private toast: ToastrService){
    }
  ngOnInit(): void {
    const userStorage = localStorage.getItem("currentUser") || null; 
    const currentUser = JSON.parse(userStorage!); 
    this.user = currentUser;
    this.sectorActivity = this.content.columnsBoard;
    this.getActivities();
    this.getActivitiesDependents();
    this.getColaborators();
    if(this.activity != undefined && this.activity != null){
      const sectorActivityEnum = this.sectorActivity.find(element => element.sectorActivityEnum === this.activity.sectorActivityEnum);
      const statusPriorityEnum = this.statusPriorityActivity.find(element => element.statusPriorityEnum === this.activity.statusPriorityEnum);
      const tagActivityEnum = this.tagsActivity.find(element => element.tagsEnum === this.activity.tagsEnum);
      this.activity.activityDependentList.map((activityDependent: any) => {
        this.owner.push({
          ...activityDependent,
          id: activityDependent.activitySource

        });
      });
      this.formActivity.patchValue({
        ...this.activity,
        activityDependentIds: this.activity.activityDependentList,
        sectorActivity: sectorActivityEnum,
        statusPriorityActivity: statusPriorityEnum,
        tagsActivity: tagActivityEnum
        });
      }

  }
  compareFunction(item: any, selected: any){
      return item.id === selected;
  }
  getActivities(){
    const userStorage = localStorage.getItem("currentUser") || null; 
    const currentUser = JSON.parse(userStorage!); 
    this.user = currentUser;
    this.activitiesList = [];
    this.activityService.findAllBy({
      organizationId: this.user.organizationId,
      projectId: this.content.id
    }).subscribe(resp =>{
      this.activitiesList = resp.content;
    });
  }

  getActivitiesDependents(){
    const userStorage = localStorage.getItem("currentUser") || null; 
    const currentUser = JSON.parse(userStorage!); 
    this.user = currentUser;
    this.activitiesDependentsList = [];
    this.activityDependentService.findAll({}).subscribe(resp =>{
      this.activitiesDependentsList = resp.content;
    });
  }
  save(){
    const userStorage = localStorage.getItem("currentUser") || null; 
    const currentUser = JSON.parse(userStorage!); 
    this.user = currentUser;
    if (!this.buttonDisabled) {
      this.buttonDisabled = true;

      if(this.formActivity.value.userSelect != null){
        this.userSaveVO = {
          id: this.formActivity.value.userSelect.id
        }
      }

      const activity = {
        ...this.formActivity.value,
        columnBoardId: this.formActivity.value.sectorActivity.id,
        projectId: this.content.id,
        userSaveVO: this.userSaveVO != null ? this.userSaveVO : null,
        estimatedTime: this.formActivity.value.estimatedTime != null ? this.formActivity.value.estimatedTime.name : null,
        sectorActivity: this.formActivity.value.sectorActivity != null ? this.formActivity.value.sectorActivity.sectorActivity  : null,
        tagsEnum: this.formActivity.value.tagsActivity.name != null ? this.formActivity.value.tagsActivity.tagsEnum : null,
        statusPriorityEnum: this.formActivity.value.statusPriorityActivity.name != null ? this.formActivity.value.statusPriorityActivity.statusPriorityEnum : null,
      }

      this.activityService.save(activity).subscribe({
        next: () => {
          this.getActivities();
          this.getActivitiesDependents();
          this.activeModal.close(true);
        },
        error: () => {
          this.buttonDisabled = false;
        }
      });
    }
  }
  ngAfterViewInit():void{
    this.getActivitiesDependents();
  };

  getColaborators(){
    
    this.user.findAllBy({
      organizationId: this.user.organizationId,
      projectId: this.content.id
    }).subscribe( response => {
      this.colaborators = response.content.filter((colaborator:any) => colaborator.profile != 'ADMINISTRADOR');
    })
  }

  update(){
    this.owner = [];
        this.formActivity.value.activityDependentIds.map((activitiesSourceDep:any) =>{
        let activitiesSourceId = activitiesSourceDep.activitySource != undefined ? activitiesSourceDep.activitySource : activitiesSourceDep;
        let activitySource = this.activity.activityDependentList.find((activity:any) =>
          activity.activitySource == activitiesSourceId
        );

        if(activitySource != null && activitySource != undefined){
          this.owner.push({
            ...activitySource,
            activityBranch: this.activity.id
          });
        }else{
          let activitySource = this.activitiesList.find((activitySource:any) => activitySource.id == activitiesSourceDep);
          this.owner.push({
            id: null,
            activityBranch: this.activity.id,
            identifierBranch:this.activity.identifier,
            activitySource: activitySource.id,
            identifierSource: activitySource.identifier,
          });
        }
      });
    if (!this.buttonDisabled) {
      if(this.formActivity.value.userSelect != null){
        this.userSaveVO = {
          id: this.formActivity.value.userSelect.id
        }
      }
      this.buttonDisabled = true;
      const activity = ({
        ...this.formActivity.value,
        columnBoardId: this.formActivity.value.sectorActivity.id,
        projectId: this.content.id,
        activityDependentIds: this.owner,
        userSaveVO: this.userSaveVO != null ? this.userSaveVO : null,
        estimatedTime: this.formActivity.value.estimatedTime != null ? this.formActivity.value.estimatedTime.name : null,
        sectorActivity: this.formActivity.value.sectorActivity != null ? this.formActivity.value.sectorActivity.sectorActivity  : null,
        tagsEnum: this.formActivity.value.tagsActivity.name != null ? this.formActivity.value.tagsActivity.tagsEnum : null,
        statusPriorityEnum: this.formActivity.value.statusPriorityActivity.name != null ? this.formActivity.value.statusPriorityActivity.statusPriorityEnum : null,
      });
      this.activityService.updateActivity(activity).subscribe({
        next: () => {
          this.getActivities();
          this.getActivitiesDependents();
          this.activeModal.close(true);
          this.owner = [];
          this.toast.success("Atividade atualizada com sucesso!");
        },
        error: () => {
          this.toast.success("Erro ao atualizar dados da seguinte atividade: " + activity.id);
          this.buttonDisabled = false;
        }
      });
    }
  }
}
