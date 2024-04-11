import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectComponent } from 'src/app/forms/modal/create-project/create-project.component';
import { DeleteProjectComponent } from 'src/app/modal/project/delete-project/delete-project.component';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { DetailsProjectComponent } from 'src/app/modal/project/details-project/details-project.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit{

  public projects: Array<any> = new Array();
  public checkedProgress: boolean = false;
  public checkedFinished: boolean = false;
  public storage: any;
  public userInfo: any;

  @Output() emitDeleteProject: EventEmitter<number> = new EventEmitter();


  ngOnInit(): void {
    this.getProjects();
  }

  constructor(
    private modalService: NgbModal,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private authService: AuthService,
    private user: UserService){
      this.storage = sessionStorage.getItem("currentUser") ? sessionStorage : localStorage;

      var storage = sessionStorage.getItem("currentUser") ? sessionStorage : localStorage;
      this.userInfo = JSON.parse(storage.getItem("currentUser") || '{}');
    }


  createProject(): void {
    const modalResult = this.modalService.open(CreateProjectComponent);
    modalResult.result.then((result) => {
      if(result){
        this.getProjects();
      }
    })
  }

  deleteProject(project: any): void {
    const modalResult = this.modalService.open(DeleteProjectComponent);
    modalResult.componentInstance.content = project;
    modalResult.result.then((result) => {
      if(result){
        this.projectService.delete(project.id).subscribe({
          next: (resp) => {
            this.getProjects();
            this.toastr.success('Projeto Removido com sucesso!');
          },
          error: (error) => {
            this.toastr.error(`Ocorreu um ao remover o projeto: ${project.name}`);
          }
        })
      }
    })
  }

  getProjects(): void {
    this.projectService.findBy({
      organizationId: this.user.organizationId
    }).subscribe({
      next: (resp) => {
        this.projects = resp.body.content;
      },
      error: (err) => {
      }
    });
  }

  //refactoring 70-93
  checkedProjectFinish(value: any){
    this.checkedProgress = !this.checkedProgress;

    if(value.checked){
      if(this.projects.length > 0){
        this.projects = this.projects.filter(project => project.isFinished == true);
      }
    }else{
      this.getProjects();
    }
  }

  checkedProjectProgress(value: any){
    this.checkedFinished = !this.checkedFinished;

    if(value.checked){
      if(this.projects.length > 0){
        this.projects = this.projects.filter(project => project.isFinished == false);
      }
    }else{
      this.getProjects();
    }
  }

  detailsProject(project: any){
    const modalResult = this.modalService.open(DetailsProjectComponent);
    modalResult.componentInstance.content = project;
  }
}
