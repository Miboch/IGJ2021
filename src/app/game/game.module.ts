﻿import {NgModule} from '@angular/core';
import {gameComponents} from './components';
import {gameDirectives} from './directives';
import {StoreModule} from '@ngrx/store';
import {GameStateReducers} from './store';
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
