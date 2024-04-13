import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewProjectsColaboratorComponent } from 'src/app/modal/project/view-projects-colaborator/view-projects-colaborator.component';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-colaborator',
  templateUrl: './view-colaborator.component.html',
  styleUrls: ['./view-colaborator.component.sass']
})
export class ViewColaboratorComponent implements OnInit{

  public colaborator:any;
  public idColaborator:any;
  public projects: Array<any> = [];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private projectService: ProjectService,
              private modalService: NgbModal
              ){}

  ngOnInit(): void {
    this.idColaborator = this.route.snapshot.url[1].path;
    if(this.idColaborator === null || this.idColaborator === undefined){

    }else{
      this.getColaborator();
      this.getProjectsUser();

    }
  }

  getColaborator(){
    this.userService.findBy("ID", [this.idColaborator]).subscribe({
      next:(response) => {
        this.colaborator = response;
      },
    })
  }

  getProjectsUser(){
    this.projectService.findBy({userId: this.idColaborator}).subscribe({
      next:(response) => {
        this.projects = response.content;
      }
    })
  }

  viewProjectsUser(){
    const modalResult = this.modalService.open(ViewProjectsColaboratorComponent);
    modalResult.componentInstance.content = this.projects;
    modalResult.componentInstance.colaborator = this.colaborator;
    modalResult.result.then((result) => {
      if(result) {
        this.getProjectsUser();
      }
    });
  }
}
