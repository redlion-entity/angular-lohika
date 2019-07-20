import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-size-list',
  templateUrl: './file-size-list.component.html',
  styleUrls: ['./file-size-list.component.scss']
})
export class FileSizeListComponent implements OnInit {
  @Input()
  public fileSizes: number[];

  constructor() { }

  ngOnInit() {
  }

}
