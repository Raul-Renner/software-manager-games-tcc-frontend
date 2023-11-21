import { ActivityDependentService } from './../../services/activity-dependent.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivityDependentFilterType } from 'src/app/interfaces/filters';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.sass']
})
export class CreateActivityComponent implements OnInit, AfterViewInit{

  public sectorActivity: Array<any> = [
    {id: 1, name:'PRIORIDADE', sectorActivityEnum:'PRIORITY'},
    {id: 2, name:'PREPARAÇÃO', sectorActivityEnum:'TO_DO'},
    {id: 3, name:'SOFTWARE', sectorActivityEnum:'SOFTWARE'},
    {id: 4, name:'ARTE', sectorActivityEnum:'ART'},
    {id: 5, name:'DESIGN', sectorActivityEnum:'DESIGN'},
    {id: 6, name:'SOM', sectorActivityEnum:'SOUND'},
    {id: 7, name:'INTEGRAÇÃO', sectorActivityEnum:'INTEGRATION'},
    {id: 8, name:'TESTE', sectorActivityEnum:'TEST'},
    {id: 9, name:'FEITO', sectorActivityEnum:'DONE'}
  ];
  public statusActivity: Array<any> = [
    {id: 1, name:'TO_DO', statusActivityEnum:'TO_DO'},
    {id: 2, name:'IN PROGRESS', statusActivityEnum:'IN_PROGRESS'},
    {id: 3, name:'IN REVIEW', statusActivityEnum:'IN_REVIEW'},
    {id: 4, name:'DONE', statusActivityEnum:'DONE'}
  ];

  public statusPriorityActivity: Array<any> = [
    {id: 1, name:'BAIXA', statusPriorityEnum:'LOW'},
    {id: 2, name:'MÉDIA', statusPriorityEnum:'MEDIUM'},
    {id: 3, name:'ALTA', statusPriorityEnum:'HIGH'}
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



  public formActivity:FormGroup = new FormGroup ({
    id: new FormControl(null),
    identifier: new FormControl(null),
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    estimatedTime: new FormControl(null),
    sectorActivity: new FormControl([]),
    statusActivity: new FormControl(""),
    statusPriorityActivity: new FormControl(""),
    tagsActivity: new FormControl(""),
    colorCard: new FormControl("#FFFFFF"),
    isBlock: new FormControl(false),
    activityDependentIds: new FormControl([]),
  });

  constructor(
    private activityService: ActivityService,
    private activityDependentService: ActivityDependentService,
    public activeModal: NgbActiveModal){
    }
  ngOnInit(): void {
    this.getActivities();
    this.getActivitiesDependents();
    if(this.activity != undefined && this.activity != null){
      const sectorActivityEnum = this.sectorActivity.find(element => element.sectorActivityEnum === this.activity.sectorActivityEnum);
      const statusActivityEnum = this.statusActivity.find(element => element.statusActivityEnum === this.activity.statusActivityEnum);
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
        statusActivity: statusActivityEnum,
        statusPriorityActivity: statusPriorityEnum,
        tagsActivity: tagActivityEnum
        });
      }

  }
  compareFunction(item: any, selected: any){
      return item.id === selected;
  }
  getActivities(){
    this.activitiesList = [];
    this.activityService.findAll().subscribe(resp =>{
      this.activitiesList = resp.content;
    });

  }
  getActivitiesDependents(){
    this.activitiesDependentsList = [];
    this.activityDependentService.findAll({}).subscribe(resp =>{
      this.activitiesDependentsList = resp.content;
    });
  }
  save(){
    if (!this.buttonDisabled) {
      this.buttonDisabled = true;
      const activity = {
        ...this.formActivity.value,
        tagsEnum: this.formActivity.value.tagsActivity.name != null ? this.formActivity.value.tagsActivity.tagsEnum : null,
        statusPriorityEnum: this.formActivity.value.statusPriorityActivity.name != null ? this.formActivity.value.statusPriorityActivity.statusPriorityEnum : null,
        statusActivityEnum: this.formActivity.value.statusActivity.name != null ? this.formActivity.value.statusActivity.statusActivityEnum : null,
        sectorActivityEnum: this.formActivity.value.sectorActivity.name != null ? this.formActivity.value.sectorActivity.sectorActivityEnum : null,

      }
      this.activityService.save(activity).subscribe({
        next: () => {
          //alert success
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
      this.buttonDisabled = true;
      const activity = ({
        ...this.formActivity.value,
        activityDependentIds: this.owner,
        tagsEnum: this.formActivity.value.tagsActivity.name != null ? this.formActivity.value.tagsActivity.tagsEnum : null,
        statusPriorityEnum: this.formActivity.value.statusPriorityActivity.name != null ? this.formActivity.value.statusPriorityActivity.statusPriorityEnum : null,
        statusActivityEnum: this.formActivity.value.statusActivity.name != null ? this.formActivity.value.statusActivity.statusActivityEnum : null,
        sectorActivityEnum: this.formActivity.value.sectorActivity.name != null ? this.formActivity.value.sectorActivity.sectorActivityEnum : null,
      });
      this.activityService.updateActivity(activity).subscribe({
        next: () => {
          //alert success
          this.getActivities();
          this.getActivitiesDependents();
          this.activeModal.close(true);
          this.owner = [];

        },
        error: () => {
          this.buttonDisabled = false;
        }
      });
    }
  }
}
