import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { StoreModule } from '@ngrx/store';
import {GameModule} from './game/game.module';
import {UiModule} from './ui/ui.module';
import {ApplicationReducer} from './host/store';
import {ApiInterceptor} from './host/interceptors/api.interceptor';
import {components, routedComponents} from './host/components';
import {environment} from '../environments/environment';
import {DebuggingModule} from './debugging/debugging.module';

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ...routedComponents,
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
    StoreModule.forRoot(ApplicationReducer),
    GameModule,
    UiModule,
    environment.production ? [] : DebuggingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
