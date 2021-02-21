import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {components, routedComponents} from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {directives} from './directives';
import { StoreModule } from '@ngrx/store';
import {GameModule} from './game/game.module';

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ...routedComponents,
    ...directives
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({}),
    GameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
