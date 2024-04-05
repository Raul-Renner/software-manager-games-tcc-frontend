import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-adm-colaborator',
  templateUrl: './edit-adm-colaborator.component.html',
  styleUrls: ['./edit-adm-colaborator.component.sass']
})
export class EditAdmColaboratorComponent implements OnInit, AfterViewInit {

  public storage: any;
  public userInfo: any;
  public buttonDisabled : boolean = false;
  public colaborator:any;
  public idColaborator:any;
  public projects: Array<any> = [];
  public projectsUser: Array<any> = [];
  public profiles: Array<any> = [];

  public formColaborator:FormGroup = new FormGroup ({
    role: new FormControl("", Validators.required),
    listProjects: new FormControl([]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private toast: ToastrService,
    public profileService: ProfileService,
    public projectService: ProjectService

  ){}


  ngOnInit(): void {

    this.idColaborator = this.route.snapshot.url[1].path;
    if(this.idColaborator === null || this.idColaborator === undefined){
      this.toast.error("Erro ao buscar usuário selecionado!");
      this.router.navigate(["/colaborators"]);
    }
      this.getColaborator();
      this.getProfiles();


    this.storage = sessionStorage.getItem("currentUser") ? sessionStorage : localStorage;

    var storage = sessionStorage.getItem("currentUser") ? sessionStorage : localStorage;
    this.userInfo = JSON.parse(storage.getItem("currentUser") || '{}');
  }

  ngAfterViewInit(): void {
    this.getAllProjects();
  };

  getColaborator(){
    this.userService.findBy("ID", [this.idColaborator]).subscribe({
      next:(response) => {
        this.colaborator = response;
        this.projectsUser = response.projects;
      },
    })
  }

  getProfiles(){
    this.profileService.findAll().subscribe({
      next: (resp) => {
        this.profiles = resp;
      }
    })
  }

  getAllProjects(){
    this.projectService.findBy({organizationId: this.colaborator.organization.id}).subscribe({
      next: (response) => {
        this.projects = response.body.content;
      },
    });
  }

  update(){
    if (!this.buttonDisabled) {
      this.buttonDisabled = true;
      const userDTO = {
        id: this.idColaborator,
        projectsIds: this.formColaborator.value.listProjects,
        profile: this.formColaborator.value.role.type
      };
      this.userService.updateProjectsAndProfile(this.idColaborator ,userDTO).subscribe({
          next: (response) => {
            this.toast.success("Usuário atualizado com sucesso!");

            this.router.navigate(['/colaborators']);
          },
          error: () => {
            this.toast.error("Erro ao atualizar dados do usuário!");
          }
      })
    }
  }

  compareFunction(item: any, selected: any){
    return item.id === selected;
  }
}
