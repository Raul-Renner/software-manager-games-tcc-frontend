import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  user: any;
  constructor(
    public authService: AuthService,
  ){}

  ngOnInit(): void {
    const userStorage = localStorage.getItem("currentUser") || null;
    const currentUser = JSON.parse(userStorage!);
    this.user = currentUser;
    this.linksNavigationUser();
  }

  onActivate(componentRef:any){
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - (componentRef.constructor.name === "HomeGeneralComponent" ? 10000 : 50));
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  public links = [
    { url: "/home", icon: "assets/icons/home-icon.svg", iconWhite: "assets/icons/home-icon-white.svg",  label: "Home"},
    { url: "/colaborator-projects", icon: "assets/icons/project.svg", iconWhite: "assets/icons/project-white.svg", label: "Projetos"}
  ];


  private linksNavigationUser(){
    switch(this.user.profile){
      case "ADMINISTRADOR":
        this.links = [
          { url: "/home-admin", icon: "assets/icons/home-icon.svg", iconWhite: "assets/icons/home-icon-white.svg",  label: "Home"},
          { url: "/projects", icon: "assets/icons/project.svg", iconWhite: "assets/icons/project-white.svg", label: "Projetos"},
          { url: "/colaborators", icon: "assets/icons/group.svg", iconWhite: "assets/icons/group-white.svg",  label: "Colaboradores"},
        ];
        break;
      case "DESENVOLVEDOR":
        this.links = [
          { url: "/home", icon: "assets/icons/home-icon.svg", iconWhite: "assets/icons/home-icon-white.svg",  label: "Home"},
          { url: "/colaborator-projects", icon: "assets/icons/project.svg", iconWhite: "assets/icons/project-white.svg", label: "Projetos"}
        ];
        break;
      case "LIDER_TECNICO":
        this.links = [
          { url: "/home", icon: "assets/icons/home-icon.svg", iconWhite: "assets/icons/home-icon-white.svg",  label: "Home"},
          { url: "/colaborator-projects", icon: "assets/icons/project.svg", iconWhite: "assets/icons/project-white.svg", label: "Projetos"}
        ];
        break;
      case "TESTADOR":
        this.links = [
          { url: "/home", icon: "assets/icons/home-icon.svg", iconWhite: "assets/icons/home-icon-white.svg",  label: "Home"},
          { url: "/colaborator-projects", icon: "assets/icons/project.svg", iconWhite: "assets/icons/project-white.svg", label: "Projetos"}
        ];
        break;
      case "DESIGNER":
        this.links = [
          { url: "/home", icon: "assets/icons/home-icon.svg", iconWhite: "assets/icons/home-icon-white.svg",  label: "Home"},
          { url: "/colaborator-projects", icon: "assets/icons/project.svg", iconWhite: "assets/icons/project-white.svg", label: "Projetos"}
        ];
        break;
      case "GERENTE":
        this.links = [
          { url: "/home-admin", icon: "assets/icons/home-icon.svg", iconWhite: "assets/icons/home-icon-white.svg",  label: "Home"},
          { url: "/projects", icon: "assets/icons/project.svg", iconWhite: "assets/icons/project-white.svg", label: "Projetos"},
          { url: "/colaborators", icon: "assets/icons/group.svg", iconWhite: "assets/icons/group-white.svg",  label: "Colaboradores"},
        ];
        break;

    }
  }
}
