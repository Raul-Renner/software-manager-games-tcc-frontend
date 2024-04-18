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

  }
}
