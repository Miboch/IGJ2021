import {NgModule} from '@angular/core';
import {gameComponents} from './components';
import {gameDirectives} from './directives';

@NgModule({
    declarations: [
      ...gameComponents,
      ...gameDirectives,
    ],
    exports: [
      ...gameComponents,
      ...gameDirectives
    ],
    imports: [],
  }
)
export class GameModule {

}
