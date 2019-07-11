import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../app.types';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input()
  private task: Task;

  @Output()
  private doneChange: EventEmitter<Task> = new EventEmitter();

  @Output()
  private removeClick: EventEmitter<string> = new EventEmitter();

  private handleCheckboxChange(checked: boolean): void {
    this.doneChange.emit(Object.assign({}, this.task, { done: checked }));
  }

  private handleButtonClick(): void {
    this.removeClick.emit(this.task.id);
  }

  constructor() { }

  ngOnInit() {
  }

}
