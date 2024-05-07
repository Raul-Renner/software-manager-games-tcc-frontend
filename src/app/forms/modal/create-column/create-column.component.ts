import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ColumnService } from 'src/app/services/column.service';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.sass']
})
export class CreateColumnComponent implements OnInit {

  @Input() content:any;
  @Input() column:any;

  public columns: Array<any> = [];

  constructor(
    public activeModal: NgbActiveModal,
    public columnService: ColumnService,
    private modalService: NgbModal,
    private toastr: ToastrService){}

  public columnForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    sectorActivity: new FormControl(null),
    projectId: new FormControl(null),
    phase: new FormControl(null)
  });

  ngOnInit(): void {

    if(this.column != null && this.column != undefined){
      this.columnForm.patchValue({
        name: this.column.name,
        id: this.column.id
      });
    }
    this.columns = this.content[0].columnsBoard;
  }



  createColumn(){
    this.columnForm.value.phase = 'EXECUTION';
    this.columnForm.value.projectId = this.content[0].id;
    this.columnService.save(this.columnForm.value).subscribe({
      next: (response) => {
        this.toastr.success("Coluna criada com sucesso!");
        this.columnForm.reset();
        this.activeModal.close(true);
      },
      error: (response) => {
        this.toastr.error("Ocorreu um erro ao criar coluna.");
        this.columnForm.reset();
        this.activeModal.close(false);

      }
    })
  }

  compareFunction(item: any, selected: any){
    return item.id === selected;
  }

  updateColumn(){
    this.column.name = this.columnForm.value.name;
    this.column.projectId = this.content.id;

    this.columnService.update(this.column).subscribe({
      next: (response) => {
        this.toastr.success("Nome da coluna atualizado!");
        this.activeModal.close(true);
      },
      error: (response) => {
        this.toastr.error("Erro ao atualizar o nome da coluna!");
      }
    })
  }
}
