import {NgModule} from '@angular/core';
import {uiDirectives} from './directives';
import {UiComponents} from './components';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../material.module';

@NgModule({
  declarations: [...uiDirectives, ...UiComponents],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [...uiDirectives, ...UiComponents],
})
export class UiModule {

}
