import { Component } from '@angular/core';

import { FILE_SIZES } from './mocks/fileSizes.mock';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private fileSizes: number[] = FILE_SIZES.reverse();

  private handleFormSubmit(event: Event): void {
    event.preventDefault();

    // @ts-ignore
    const inputElement: HTMLInputElement = event.target.elements.fileSize;

    this.fileSizes.unshift(+inputElement.value);
    inputElement.value = '';
    inputElement.blur();
  }
}
