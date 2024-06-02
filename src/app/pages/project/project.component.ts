import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectComponent } from 'src/app/forms/modal/create-project/create-project.component';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { DetailsProjectComponent } from 'src/app/modal/project/details-project/details-project.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteComponent } from 'src/app/forms/modal/delete/delete.component';

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
  public userId: number;
  user: any;
  @Output() emitDeleteProject: EventEmitter<number> = new EventEmitter();


  ngOnInit(): void {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    this.user = currentUser;
    this.userId = this.user.userId
    this.getProjects();
  }

  constructor(
    private modalService: NgbModal,
    private projectService: ProjectService,
    private toastr: ToastrService){
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
    const modalResult = this.modalService.open(DeleteComponent);
    modalResult.componentInstance.head = "Deseja excluir o seguinte projeto?";
    modalResult.componentInstance.label = "Projeto";
    modalResult.componentInstance.infor3 = project.name;
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
        this.projects = resp.content;
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
