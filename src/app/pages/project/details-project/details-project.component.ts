import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectComponent } from 'src/app/forms/modal/create-project/create-project.component';
import { EditProjectComponent } from 'src/app/forms/modal/edit-project/edit-project.component';
import { ViewActivitiesComponent } from 'src/app/modal/project/view-activities/view-activities.component';
import { ViewColaboratorsComponent } from 'src/app/modal/project/view-colaborators/view-colaborators.component';
import { ActivityService } from 'src/app/services/activity.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.sass']
})
export class DetailsProjectComponent implements OnInit {

  project: any;
  idProject: any;
  colaborators: Array<any> = [];
  activities: Array<any> = [];
  activitiesFinished: Array<any> = [];
  userId: number;
  user: any;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService,
    private activityService: ActivityService,
    private modalService: NgbModal){}

  ngOnInit(): void {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    this.user = currentUser;
    this.idProject = this.route.snapshot.url[1].path;
    this.userId = this.user.userId;
    if(this.idProject === null || this.idProject === undefined){

    }else{
      this.getColaborators();
      this.getProject();
      this.getActivities();

    }
  }

  getColaborators(){
    this.userService.findAllBy({
      organizationId: this.user.organizationId,
      projectId: this.idProject
    }).subscribe({
      next:(response) => {
        this.colaborators = response.content;
      },
    })
  }

  getActivities(){
    this.activityService.findAllBy({
      organizationId: this.user.organizationId,
      projectId: this.idProject
    }).subscribe({
      next:(response) => {
        this.activities = response.content;
        this.activitiesFinished = this.activities.filter(activity => activity.isFinished == true);
      },
    })
  }

  getProject(){
    this.projectService.findBy({
      projectIds:[this.idProject],
      organizationId: this.user.organizationId
    }).subscribe({
      next: (response) => {
        this.project = response.content[0];
      },
    })
  }
  viewColaborator(){
    const modalResult = this.modalService.open(ViewColaboratorsComponent);
    modalResult.componentInstance.content = this.colaborators;
    modalResult.componentInstance.projectId = this.idProject;
    modalResult.result.then((result) => {
      if(result){
        this.getColaborators();
      }
    });
  }

  viewActivities(isFinished: boolean){
    const modalResult = this.modalService.open(ViewActivitiesComponent);
    modalResult.componentInstance.content = this.activities;
    modalResult.componentInstance.isFinished = isFinished;
    modalResult.result.then((result) => {
      if(result){
        this.getActivities();
      }
    });
  }

  updateProject(): void {
    const modalResult = this.modalService.open(EditProjectComponent);
    modalResult.componentInstance.content = this.project;
    modalResult.result.then((result) => {
      if(result){}
    })
  }
}
