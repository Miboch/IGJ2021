import {NgModule} from '@angular/core';
import {gameComponents} from './angular';
import {gameDirectives} from './angular';
import {StoreModule} from '@ngrx/store';
import {GameStateReducers} from './angular';
import {UiModule} from '../ui/ui.module';

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
      StoreModule.forFeature('game', GameStateReducers),
      UiModule
    ],
  }
)
export class GameModule {

}

