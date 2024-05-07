import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.sass']
})
export class EditProjectComponent implements OnInit {


  @Input()
  content:any;

  constructor(
    public activeModal: NgbActiveModal,
    public projectService: ProjectService,
    public toarst: ToastrService
  ){}


  public projectForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    this.projectForm.value.name = this.content.name;
    this.projectForm.value.description = this.content.description;

    this.projectForm.patchValue({
      name: this.projectForm.value.name,
      description: this.projectForm.value.description
    });
  }



  updateProject(){
    this.content.name = this.projectForm.value.name;
    this.content.description = this.projectForm.value.description;
    this.projectService.updateDescAndTitle(this.content).subscribe({
      next: (response: any) => {
        this.toarst.success("Projeto atualizado com sucesso!");
        this.projectForm.reset();
        this.activeModal.close();
      },
      error: (response: any) => {
        this.toarst.error("Erro ao atualizar projeto!");
      }
    });

  }
}
