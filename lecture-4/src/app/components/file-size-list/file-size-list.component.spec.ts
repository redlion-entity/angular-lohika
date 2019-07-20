import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSizeListComponent } from './file-size-list.component';

describe('FileSizeListComponent', () => {
  let component: FileSizeListComponent;
  let fixture: ComponentFixture<FileSizeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSizeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
