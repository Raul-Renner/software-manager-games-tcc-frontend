import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-general',
  templateUrl: './home-general.component.html',
  styleUrls: ['./home-general.component.sass']
})
export class HomeGeneralComponent implements OnInit {
  storage: any;
  user: any;
  projects: Array<any> = [];
  activitiesUser: Array<any> = [];
  activitiesFinished: Array<any> = [];
  constructor(
    public spinner: NgxSpinnerService,
    public userService: UserService,
    public auth: AuthService,
    public toast: ToastrService
  ){}
  ngOnInit(): void {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    this.user = currentUser;

    this.getProjectsUser();
  }

  getProjectsUser(){
    this.userService.findAllBy({
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
      },
      error:(error) => {
        this.toast.error("Ocorreu um Erro ao buscar seus projetos!");
      },
    })
  }

}
