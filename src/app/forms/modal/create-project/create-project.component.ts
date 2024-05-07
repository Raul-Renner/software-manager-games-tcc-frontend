import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.sass']
})
export class CreateProjectComponent implements OnInit {

  public owner: Array<any> = [];

  public colaborators: Array<any> = [];

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService,
              private projectService: ProjectService,
              private toastr: ToastrService){}

  public projectForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    organizationId: new FormControl(null),
    members: new FormControl([]),
    activities: new FormControl([])
  });

  ngOnInit(): void {
    this.getMembers();
  }


  createProject(){
    this.projectForm.value.organizationId = this.userService.organizationId;
    this.projectService.save(this.projectForm.value).subscribe({
      next:() => {
        this.toastr.success("Projeto cadastrado com sucesso!");
        this.projectForm.reset();
        this.activeModal.close(true);
      },
      error:(response) => {
        this.toastr.error(response.error.errors[0].defaultMessage, "Error ao cadastrar projeto!");
        this.activeModal.close(true);
        this.projectForm.reset();
      }
    })
  }

  getMembers(){
    this.userService.findAllBy({
      organizationId: this.userService.organizationId
    }).subscribe(response => {
      this.colaborators = response.content;
    });
  }

  compareFunction(item: any, selected: any){
    return item.id === selected;
  }
}
