import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrModule } from 'ngx-toastr';
import {MatExpansionModule} from '@angular/material/expansion';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
import { CreateActivityComponent } from './modal/activity/create-activity/create-activity.component';
import { BoardComponent } from './board/board/board.component';
import { BoardItemComponent } from './board/board-item/board-item.component';
import { ViewActivityComponent } from './modal/view-activity/view-activity.component';
import { ViewDependenciesComponent } from './modal/view-dependencies/view-dependencies.component';
import { LoginComponent } from './login/login.component';
import { LoggedOrganizationComponent } from './forms/logged-organization/logged-organization.component';
import { RecoveryPasswordComponent } from './forms/recovery-password/recovery-password.component';
import { RedefinePasswordComponent } from './forms/redefine-password/redefine-password.component';
import { HeadComponent } from './layout/head/head.component';
import { NavComponent } from './layout/head/nav/nav.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HomeGeneralComponent } from './pages/pages-home/home-general/home-general.component';
import { ColaboratorsComponent } from './pages/colaborators/colaborators.component';
import { ProjectComponent } from './pages/project/project.component';
import { CreateColaboratorComponent } from './forms/create-colaborator/create-colaborator.component';
import { CreateProjectComponent } from './forms/modal/create-project/create-project.component';
import { DeleteColaboratorComponent } from './modal/colaborator/delete-colaborator/delete-colaborator.component';
import { ViewColaboratorComponent } from './pages/colaborators/view-colaborator/view-colaborator.component';
import { EditAdmColaboratorComponent } from './pages/colaborators/edit-adm-colaborator/edit-adm-colaborator.component';
import { DeleteProjectComponent } from './modal/project/delete-project/delete-project.component';
import { DetailsProjectComponent } from './pages/project/details-project/details-project.component';
import { ViewColaboratorsComponent } from './modal/project/view-colaborators/view-colaborators.component';
import { ViewActivitiesComponent } from './modal/project/view-activities/view-activities.component';
import { ViewProjectsColaboratorComponent } from './modal/project/view-projects-colaborator/view-projects-colaborator.component';
import { ProjectColaboratorComponent } from './pages/colaborators/project-colaborator/project-colaborator.component';
import { HomeAdminComponent } from './pages/pages-home/home-admin/home-admin.component';
import { DeleteActivityComponent } from './modal/activity/delete-activity/delete-activity.component';
import { EditProjectComponent } from './forms/modal/edit-project/edit-project.component';
import { CreateColumnComponent } from './forms/modal/create-column/create-column.component';
import { ViewColumnsComponent } from './forms/modal/view-columns/view-columns.component';
import { DeleteComponent } from './forms/modal/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConfirmModalComponent,
    CreateActivityComponent,
    BoardComponent,
    BoardItemComponent,
    ViewActivityComponent,
    ViewDependenciesComponent,
    LoginComponent,
    LoggedOrganizationComponent,
    RecoveryPasswordComponent,
    RedefinePasswordComponent,
    HeadComponent,
    NavComponent,
    SidebarComponent,
    HomeGeneralComponent,
    ColaboratorsComponent,
    ProjectComponent,
    CreateColaboratorComponent,
    CreateProjectComponent,
    DeleteColaboratorComponent,
    ViewColaboratorComponent,
    EditAdmColaboratorComponent,
    DeleteProjectComponent,
    DetailsProjectComponent,
    ViewColaboratorsComponent,
    ViewActivitiesComponent,
    ViewProjectsColaboratorComponent,
    ProjectColaboratorComponent,
    HomeAdminComponent,
    DeleteActivityComponent,
    EditProjectComponent,
    CreateColumnComponent,
    ViewColumnsComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    MatExpansionModule,
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
