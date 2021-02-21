import {NgModule} from '@angular/core';
import {gameComponents} from './components';
import {gameDirectives} from './directives';
import {StoreModule} from '@ngrx/store';
import {GameStateReducers} from './store';

@NgModule({
    declarations: [
      ...gameComponents,
      ...gameDirectives,
    ],
    exports: [
      ...gameComponents,
      ...gameDirectives
    ],
    imports: [
      StoreModule.forFeature('game', GameStateReducers)
    ],
  }
)
export class GameModule {

}
