import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-projects-colaborator',
  templateUrl: './view-projects-colaborator.component.html',
  styleUrls: ['./view-projects-colaborator.component.sass']
})
export class ViewProjectsColaboratorComponent implements OnInit {

  @Input() content: any;
  @Input() colaborator: any;

  entityColaborator: any;
  constructor(
    public activeModal: NgbActiveModal,
    private user: UserService,
    private toast: ToastrService){}


  ngOnInit(): void {
    // this.entityColaborator = {
    //   id: this.colaborator.id,
    //   activities: this.colaborator.activities,
    //   login: this.colaborator.login,
    //   organization: this.colaborator.organization
    //   password:
    // }
  }

  // deleteProjectUser(projectId:number){
  //  this.colaborator.projects = this.colaborator.projects.filter((p:any) => p.id !== projectId);
  //   this.user.update(this.colaborator).subscribe({
  //     next: () => {
  //       this.activeModal.close(true);
  //       this.toast.success('Projeto Removido!','Projeto foi removido com sucesso!');
  //     },
  //     error: () => {
  //       this.toast.error('Ocorreu um ao remover projeto');
  //     }
  //   })
  // }

}
