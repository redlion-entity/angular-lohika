 import { Component } from '@angular/core';

 import { Tasks } from './app.types'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private tasks: Tasks = [];
}
