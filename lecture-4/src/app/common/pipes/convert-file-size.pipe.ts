import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertFileSize'
})
export class ConvertFileSizePipe implements PipeTransform {

  transform(value: number): string {
    const suffixes: string[] = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let currentValue: number = value;
    let currentSuffix: string;

    suffixes.every((suffix: string): boolean => {
      currentSuffix = suffix;

      if (currentValue < 1024) {
        return false;
      }

      currentValue = currentValue / 1024;

      return true;
    });

    if (currentValue !== (currentValue ^ 0)) {
      currentValue = Math.round(currentValue * 1000) / 1000;
    }

    return `${currentValue} ${currentSuffix}`;
  }

}
