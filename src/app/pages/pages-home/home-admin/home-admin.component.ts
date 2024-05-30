import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.sass']
})
export class HomeAdminComponent implements OnInit {
  user: any;
  public colaborators: Array<any> = [];
  public projects: Array<any> = [];
  public projectsFinished: Array<any> = [];
  public projectsProgress: Array<any> = [];
  constructor(
    public spinner: NgxSpinnerService,
    public userService: UserService,
    public auth: AuthService,
    public projectService: ProjectService

  ){}

  ngOnInit(): void {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    this.user = currentUser;
    this.getColaborators();
    this.getProjects();
  }
  getColaborators(){
    this.userService.findAllBy({
      organizationId: this.user.organizationId
    }).subscribe({
      next: (response) => {
        this.colaborators = response.content;
      }
    })
  }

  getProjects(): void {
    this.projectService.findBy({
      organizationId: this.user.organizationId
    }).subscribe({
      next: (resp) => {
        this.projects = resp.content;
        this.projectsProgress = this.projects.filter(project => project.isFinished === false);
        this.projectsFinished = this.projects.filter(project => project.isFinished === true);
      },
      error: (err) => {
      }
    });
  }



}
