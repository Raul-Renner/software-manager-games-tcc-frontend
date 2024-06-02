import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/forms/modal/delete/delete.component';

@Component({
  selector: 'app-view-colaborators',
  templateUrl: './view-colaborators.component.html',
  styleUrls: ['./view-colaborators.component.sass']
})
export class ViewColaboratorsComponent implements OnInit {

  @Input() content: any;

  @Input() projectId: any;

  public projectsListIds: Array<any> = [];


  constructor(public activeModal: NgbActiveModal,
    private userService: UserService,
    private modalService: NgbModal,
    public toast: ToastrService){

  }

  ngOnInit(): void {
  }

  deleteColaborator(colaborator: any): void {
    const modalResult = this.modalService.open(DeleteComponent);
    modalResult.componentInstance.head = "Deseja excluir o seguinte colaborador do projeto?";
    modalResult.componentInstance.label = "Cargo";
    modalResult.componentInstance.infor = colaborator.userInformation.name;
    modalResult.componentInstance.subInfor = colaborator.userInformation.username;
    modalResult.componentInstance.infor3 = colaborator.profile;
    modalResult.result.then((result) => {
      if(result){
        colaborator.projects.forEach((project:any) => {
          this.projectsListIds.push(project.id);
        });
        const userVO = {
          id: colaborator.id,
          login: colaborator.login,
          name: colaborator.userInformation.name,
          username: colaborator.userInformation.username,
          email: colaborator.userInformation.email,
          profileEnum: colaborator.profile,
          organizationId: colaborator.organization.id,
          projects: this.projectsListIds.filter((id:number) => id !== parseInt(this.projectId))

        };
        this.userService.update(userVO).subscribe({
          next: () => {
            this.content = this.content.filter((user:any) => user.id != colaborator.id);
            this.toast.success('Usuário foi removido com sucesso!');
            this.activeModal.close(true);
          },
          error: (error) => {
            this.toast.error(`Ocorreu um ao remover o usuário: ${colaborator.userInformation.name}`);
          }
        });
      }
    })
  }

}
