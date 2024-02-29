import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  title = 'AppComponent';
}


