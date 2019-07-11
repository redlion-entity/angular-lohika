import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ListItemComponent } from './board/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ListItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
