import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../app.types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input()
  private tasks: Array<Task>;

  @Output()
  private add: EventEmitter<string> = new EventEmitter();

  @Output()
  private remove: EventEmitter<string> = new EventEmitter();

  @Output()
  private doneChange: EventEmitter<Task> = new EventEmitter();

  private getDoneAmount(tasks: Array<Task>): number {
    return tasks.filter(({ done }: Task): boolean => !!done).length;
  }

  private getLeftAmount(tasks: Array<Task>): number {
    return tasks.filter(({ done }: Task): boolean => !done).length;
  }

  private handleInputSubmit(event): void {
    event.preventDefault();

    this.add.emit(event.target[0].value);

    event.target[0].value = '';
  }

  private handleTaskDoneChange(task: Task): void {
    this.doneChange.emit(task);
  }

  private handleTaskRemoveClick(id: string): void {
    this.remove.emit(id);
  }

  constructor() { }

  ngOnInit() {
  }

}
