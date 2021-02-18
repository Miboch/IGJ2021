import {NgModule} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';

const materialModules = [
  MatTooltipModule
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules]
})
export class MaterialModule {

}
