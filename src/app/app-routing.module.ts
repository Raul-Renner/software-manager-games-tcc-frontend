import { HomeGeneralComponent } from './pages/pages-home/home-general/home-general.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedOrganizationComponent } from './forms/logged-organization/logged-organization.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ColaboratorsComponent } from './pages/colaborators/colaborators.component';
import { ProjectComponent } from './pages/project/project.component';
import { CreateColaboratorComponent } from './forms/create-colaborator/create-colaborator.component';
import { ViewColaboratorComponent } from './pages/colaborators/view-colaborator/view-colaborator.component';
import { EditAdmColaboratorComponent } from './pages/colaborators/edit-adm-colaborator/edit-adm-colaborator.component';
import { DetailsProjectComponent } from './pages/project/details-project/details-project.component';
import { RecoveryPasswordComponent } from './forms/recovery-password/recovery-password.component';
import { ProjectColaboratorComponent } from './pages/colaborators/project-colaborator/project-colaborator.component';
import { HomeAdminComponent } from './pages/pages-home/home-admin/home-admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'prefix'},

  { path: "", component: SidebarComponent,
    children:[
      { path: "home", component: HomeGeneralComponent},
      { path: "home-admin", component: HomeAdminComponent},
      { path: "colaborators", component: ColaboratorsComponent},
      { path: "projects", component: ProjectComponent},
      { path: "colaborator-projects", component: ProjectColaboratorComponent},
      { path: "added-colaborator", component: CreateColaboratorComponent},
      { path: "view-colaborator/:idColaborator", component: ViewColaboratorComponent},
      { path: "edit-colaborator/:idColaborator", component: EditAdmColaboratorComponent},
      { path: "details-project/:idProject", component: DetailsProjectComponent}
    ],
   },
  { path: 'add_organization', component: LoggedOrganizationComponent},
  { path: 'recovery-password', component: RecoveryPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
