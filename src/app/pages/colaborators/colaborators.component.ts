import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteColaboratorComponent } from 'src/app/modal/colaborator/delete-colaborator/delete-colaborator.component';
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

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private projectService: ProjectService,
              private toast: ToastrService){}

  ngOnInit(): void {
    this.getProjects();
    this.getColaborators();
  }

  getColaborators(){
    this.userService.findAllBy({
      organizationId: 1
    }).subscribe({
      next: (response) => {
        this.colaborators = response.content;
      }
    })
  }

  deleteColaborator(colaborator: any): void {
    const modalResult = this.modalService.open(DeleteColaboratorComponent);
    modalResult.componentInstance.content = colaborator;
    modalResult.result.then((result) => {
      if(result){
        this.userService.delete(colaborator.id).subscribe({
          next: (resp) => {
            this.getColaborators();
            this.toast.success('Usuário Removido!','Usuário foi removido com sucesso!');
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
      organizationId: 1,
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
      this.userService.findAllBy({
        organizationId: 1,
        projectId: event.target.value
      }).subscribe({
        next: (response) => {
           this.colaborators = response.content;
        },
      });
    }
  }
}
