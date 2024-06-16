import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent {
  mes: number;
  ano: number;
  semanas: number[][] = [];
  diasSemana: number[] = [0, 1, 2, 3, 4, 5, 6];
  horas: string[] = [];
  meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  ngOnInit() {
    const hoje = new Date();
    this.mes = hoje.getMonth() + 1;
    this.ano = hoje.getFullYear();
    this.gerarCalendario();
  }

  gerarHoras() {
    for (let i = 0; i < 24; i++) {
      this.horas.push(`${i}:00 - ${i}:59`);
    }
  }

  gerarCalendario() {
    this.semanas = [];
    const primeiroDia = new Date(this.ano, this.mes - 1, 1);
    const ultimoDia = new Date(this.ano, this.mes, 0);
    const totalDias = ultimoDia.getDate();
    let diaSemana = primeiroDia.getDay();

    let semana: number[] = [];
    for (let i = 0; i < diaSemana; i++) {
      semana.push(0); // dias vazios antes do primeiro dia do mês
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      if (semana.length === 7) {
        this.semanas.push(semana);
        semana = [];
      }
      semana.push(dia);
    }

    if (semana.length > 0) {
      while (semana.length < 7) {
        semana.push(0); // dias vazios após o último dia do mês
      }
      this.semanas.push(semana);
    }
  }
}
