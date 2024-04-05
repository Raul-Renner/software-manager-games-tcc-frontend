import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-colaborator',
  templateUrl: './create-colaborator.component.html',
  styleUrls: ['./create-colaborator.component.sass']
})
export class CreateColaboratorComponent implements OnInit {

  password: any;
  confirm_password: any;
  show = false;
  show_confirm_password = false;

  projects: Array<any> = [];

  profiles: Array<any> = [];

  public projectsSelected: Array<any> = [];


  ngOnInit(): void {
    this.password = 'password';
    this.getProjects();
    this.getProfiles();
  }


  constructor(
    private projectService: ProjectService,
    private profileService: ProfileService,
    private userService: UserService,
    private toast: ToastrService
  ){}

  public userForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    profileEnum: new FormControl(null, Validators.required),
    email: new FormControl(null),
    login: new FormControl(null),
    password: new FormControl(null),
    organizationId: new FormControl(null),
    projects: new FormControl([]),
  });

  // updateVisibilityPassword(flag: boolean){
  //   if(flag){
  //     if (this.password === 'password') {
  //       this.password = 'text';
  //       this.show = true;
  //     } else {
  //       this.password = 'password';
  //       this.show = false;
  //     }
  //   }else{
  //     if (this.confirm_password === 'password') {
  //       this.confirm_password = 'text';
  //       this.show_confirm_password = true;
  //     } else {
  //       this.confirm_password = 'password';
  //       this.show_confirm_password = false;
  //     }
  //   }
  // }

  getProjects(){
    this.projectService.findBy({organizationId: 1}).subscribe({
      next: (response) => {
        this.projects = response.content;
      },
    })
  }

  getProfiles(){
    this.profileService.findAll().subscribe({
      next: (response) => {
        this.profiles = response;
      }
    })
  }

  save(){
    this.userForm.patchValue({
      organizationId: 1
    });
    this.userService.save(this.userForm.value).subscribe({
      next:() =>{
        this.toast.success("Sucesso!", "Cadastro realizado com sucesso!");
        this.userForm.reset();
      },
      error:(response) => {
        this.toast.error(response.error.errors[0].defaultMessage, "Error ao cadastrar usuário!");
      }
    })
  }
}