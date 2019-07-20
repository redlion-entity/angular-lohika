import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatGridListModule, MatInputModule, MatListModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileSizeListComponent } from './components/file-size-list/file-size-list.component';
import { ConvertFileSizePipe } from './common/pipes/convert-file-size.pipe';
import { ColorMarkerDirective } from './common/directives/color-marker.directive';

@NgModule({
  declarations: [
    AppComponent,
    FileSizeListComponent,
    ConvertFileSizePipe,
    ColorMarkerDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
