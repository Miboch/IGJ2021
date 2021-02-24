import {NgModule} from '@angular/core';
import {GameModule} from '../game/game.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebuggingService} from './services/debugging.service';
import {DebugWindowComponent} from './components/debug-window/debug-window.component';
import {UiModule} from '../ui/ui.module';

@NgModule({
  declarations: [
    DebugWindowComponent
  ],
  imports: [
    GameModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ],
  exports: [],
  providers: [DebuggingService]
})
export class DebuggingModule {
  constructor(private service: DebuggingService) {
    this.service.createDebuggingWindow();
  }
}
