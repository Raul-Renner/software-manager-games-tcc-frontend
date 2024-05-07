import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/forms/modal/delete/delete.component';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-colaborators',
  templateUrl: './colaborators.component.html',
  styleUrls: ['./colaborators.component.sass']
})
export class ColaboratorsComponent implements OnInit{

  public colaborators: Array<any> = new Array();

  public projects: Array<any> = [];

  public storage: any;
  public userInfo: any;

  constructor(private modalService: NgbModal,
              public user: UserService,
              private projectService: ProjectService,
              private toast: ToastrService){}

  ngOnInit(): void {
    this.storage = sessionStorage.getItem("currentUser") ? sessionStorage : localStorage;

    var storage = sessionStorage.getItem("currentUser") ? sessionStorage : localStorage;
    this.userInfo = JSON.parse(storage.getItem("currentUser") || '{}');

    this.getProjects();
    this.getColaborators();
  }

  getColaborators(){
    this.user.findAllBy({
      organizationId: this.user.organizationId
    }).subscribe({
      next: (response) => {
        this.colaborators = response.content;
      }
    })
  }

  deleteColaborator(colaborator: any): void {
    const modalResult = this.modalService.open(DeleteComponent);
    modalResult.componentInstance.head = "Deseja excluir o seguinte colaborador?";
    modalResult.componentInstance.label = "Cargo";
    modalResult.componentInstance.infor = colaborator.userInformation.name;
    modalResult.componentInstance.subInfor = colaborator.userInformation.username;
    modalResult.componentInstance.infor3 = colaborator.profile;
    modalResult.result.then((result) => {
      if(result){
        this.user.delete(colaborator.id).subscribe({
          next: () => {
            this.getColaborators();
            this.toast.success('Usuário foi removido com sucesso!');
          },
          error: (error) => {
            this.toast.error(`Ocorreu um ao remover o usuário: ${colaborator.userInformation.name}`);
          }
        })
      }
    })
  }

  getProjects(){
    this.projectService.findBy({
      organizationId: this.user.organizationId,
    }).subscribe({
      next: (response) => {
          this.projects = response.content;
      },
    });
  }
  filterUserProject(event:any){
    if(event.target.value === "Todos"){
      this.getColaborators();
    }else{
      this.user.findAllBy({
        organizationId: this.user.organizationId,
        projectId: event.target.value
      }).subscribe({
        next: (response) => {
           this.colaborators = response.content;
        },
      });
    }
  }
}
