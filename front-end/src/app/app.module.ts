import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    BrowserModule,
    CrudComponent,
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }