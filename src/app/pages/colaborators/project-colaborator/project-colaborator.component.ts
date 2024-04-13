import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-colaborator',
  templateUrl: './project-colaborator.component.html',
  styleUrls: ['./project-colaborator.component.sass']
})
export class ProjectColaboratorComponent implements OnInit {
  hideToggle: boolean = false;

  projects: Array<any> = [];
  activitiesUser: Array<any> = [];
  activitiesAllProject: Array<any> = [];
  activitiesFinished: Array<any> = [];
  userId: number;

  constructor(
    public user: UserService,
    public projectService: ProjectService,
    public toast: ToastrService){}

  ngOnInit(): void {
    this.userId = this.user.userId;
    this.getProjectsUser();
  }

  getProjectsUser(){
    this.user.findAllBy({
      organizationId: this.user.organizationId,
      userId: this.user.userId
    }).subscribe({
      next:(response) => {

        this.projects = response.content[0].projects;
        this.activitiesUser = response.content[0].activities;

        this.projects.map(project => {
          project.activitiesFinished = project.activities.filter((activity:any) => activity.isFinished == true);
          project.activities.map((activity:any) => {
            project.activitiesUser = this.activitiesUser.filter((activityUser:any) => activityUser.id === activity.id);
          });
          if(project.activities.length == 0) project.activitiesUser = [];
        });
        console.log(this.projects);
      },
      error:(error) => {
        this.toast.error("Ocorreu um Erro ao buscar seus projetos!");
      },
    })
  }

}
