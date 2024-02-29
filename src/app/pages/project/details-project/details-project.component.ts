import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewActivitiesComponent } from 'src/app/modal/project/view-activities/view-activities.component';
import { ViewColaboratorsComponent } from 'src/app/modal/project/view-colaborators/view-colaborators.component';
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



  constructor(private route: ActivatedRoute, private userService: UserService,
    private projectService: ProjectService, private modalService: NgbModal){}

  ngOnInit(): void {
    this.idProject = this.route.snapshot.url[1].path;
    if(this.idProject === null || this.idProject === undefined){

    }else{
      this.getColaborators();
      this.getProject();

    }
  }

  getColaborators(){
    this.userService.findAllBy({
      organizationId: 1,
      projectId: this.idProject
    }).subscribe({
      next:(response) => {
        this.colaborators = response.content;
      },
    })
  }

  getActivities(){

  }

  getProject(){
    this.projectService.findBy({
      projectIds:[this.idProject],
      organizationId: 1
    }).subscribe({
      next: (response) => {
        this.project = response.content[0];
        console.log(this.project);
      },
    })
  }
  viewColaborator(){
    const modalResult = this.modalService.open(ViewColaboratorsComponent);
    modalResult.componentInstance.content = this.project.members;
  }

  viewActivities(isFinished: boolean){
    const modalResult = this.modalService.open(ViewActivitiesComponent);
    modalResult.componentInstance.content = this.project.activities;
    modalResult.componentInstance.isFinished = isFinished;
  }
}
