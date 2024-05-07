import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateColumnComponent } from '../create-column/create-column.component';
import { DeleteComponent } from '../delete/delete.component';
import { ToastrService } from 'ngx-toastr';
import { ColumnService } from 'src/app/services/column.service';

@Component({
  selector: 'app-view-columns',
  templateUrl: './view-columns.component.html',
  styleUrls: ['./view-columns.component.sass']
})
export class ViewColumnsComponent implements OnInit {

  @Input()
  content: any;

  columnsBoard: Array<any> = [];
  columnsBoardExecution: Array<any> = [];

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toast: ToastrService,
    private columnService: ColumnService
  ){};

  ngOnInit(): void {
    this.columnsBoard = this.content[0].columnsBoard.filter((column: any) => column.phase === 'EXECUTION');
  }


  deleteColumn(column:any){
    const modalResult = this.modalService.open(DeleteComponent);
    modalResult.componentInstance.head = "Deseja remover a coluna seguinte do board?";
    modalResult.componentInstance.label = "Coluna";
    modalResult.componentInstance.infor3 = column.name;
    modalResult.result.then((result) => {
      if(result){
        this.columnService.delete(column.id).subscribe({
          next: (response) => {
            this.toast.success("Coluna removida com sucesso!");
            this.columnsBoard = this.columnsBoard.filter((columnBoard:any) => columnBoard.id != column.id);
            this.activeModal.close(true);
          },
          error: (response) => {
            this.toast.error("Erro ao remover coluna!");
          }
        })
      }
    })
  }

updateColumn(column:any){
  const modalResult = this.modalService.open(CreateColumnComponent);
  modalResult.componentInstance.column = column;
  modalResult.componentInstance.content = this.content[0];
  modalResult.result.then((result) => {});
}

}
