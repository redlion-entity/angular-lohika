import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appColorMarker]',
})
export class ColorMarkerDirective {

  @Input()
  public set appColorMarker(fileSize: number) {
    this.isRed = fileSize > 1024;
  }

  @HostBinding('style.color')
  private get color(): string {
    return this.isRed && 'red' || '';
  }

  private isRed: boolean;

  constructor() { }

}
