import { Component } from '@angular/core';

import { Task, Tasks } from './app.types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private tasks: Tasks = {};
  private tasksList: Array<Task> = [];

  private getSortedTasksList(): Array<Task> {
    return Object.values(this.tasks)
      .sort(({ done: done1 }: Task, { done: done2 }: Task): number => {
        if (done1 != done2) {
          return done1 && 1 || -1;
        }

        return 0;
      });
  }

  private handleTaskAdd(text: string): void {
    const task: Task = {
      id: Date.now().toString(),
      description: text,
    };

    this.tasks[task.id] = task;

    this.tasksList = this.getSortedTasksList();
  }

  private handleTaskRemove(id: string): void {
    delete this.tasks[id];

    this.tasksList = this.getSortedTasksList();
  }

  private handleTaskDoneChange(task: Task): void {
    this.tasks[task.id] = task;

    this.tasksList = this.getSortedTasksList();
  }
}
