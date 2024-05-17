import { Component } from '@angular/core';

@Component({
  selector: 'app-home-general',
  templateUrl: './home-general.component.html',
  styleUrls: ['./home-general.component.sass']
})
export class HomeGeneralComponent {

 public belongsToColumn(task: any, columnStatus: any) {
    return task.status === columnStatus;
}

  public board = {
     colunas: [
      "",
      "ToDo", 
      "Preparacao", 
      "Software",
      "Arte",
      "Design",
      "Som", 
      "Integracao",
      "Teste",
      "Feito" 
     ],
 
    tagsActivity: [
    {id: 1, name:'URGENTE', tagsEnum:'URGENT',listTask: [{name: "atividade 1", status: "Feito"},{ name: "atividade 6", status: "ToDo"},{ name: "atividade 2",status: "ToDo"}] },
    {id: 2, name:'DEPENDENTE', tagsEnum:'DEPENDENT',listTask: [{name: "atividade 3", status: "ToDo"},{ name: "atividade 4 ", status: "Feito"}]},
    {id: 3, name:'INDEPENDENTE', tagsEnum:'INDEPENDENT', listTask: [{name: "atividade 5", status: "Preparacao"}]},
    {id: 4, name:'MELHORIA', tagsEnum:'IMPROVEMENT', listTask: [{name: "atividade 8", status: "ToDo"},{ name: "atividade 7", status: "Feito"}]}
  ]
 }
   
 
}
