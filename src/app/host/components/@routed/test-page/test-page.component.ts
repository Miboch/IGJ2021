import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {ToastService} from '../../../../ui/services/toast-service';
import {RendererSystem} from '../../../../game/systems/renderer.system';
import {GameState, SaveStateModel} from '../../../../game/angular';
import * as gameSelector from '../../../../game/angular/store/selectors/game-state.selectors';
import * as gameAction from '../../../../game/angular/store/actions/game-state.actions';
import {TimerSystem} from '../../../../game/systems/timer.system';


@Component({
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})

export class TestPageComponent implements OnInit {
  textValue = "";
  modalDispaySubject$: Subject<boolean>;
  lastGameSaveTime!: Date;
  entireSaveState$!: Observable<SaveStateModel>;

  constructor(private toasterService: ToastService,
              private store: Store<GameState>,
              private render: RendererSystem,
              private timer: TimerSystem) {
    this.modalDispaySubject$ = new Subject<boolean>();
  }

  ngOnInit(): void {
    // selecting a game state and subscribing to it will automatically update the property every time
    // we dispatch a new state unless you specifically unsubscribe, such as via take(1), or manually.
    this.store.select(gameSelector.getLastUpdated).subscribe(updateTime => {
      this.lastGameSaveTime = updateTime;
    });

    // we can also utilize the async pipe with states.
    this.entireSaveState$ = this.store.select(gameSelector.getGameState);
  }

  createWarn() {
    this.toasterService.warn(this.textValue, "WARNING");
  }

  createSuccess() {
    this.toasterService.success(this.textValue, "SUCCESS");
  }

  createError() {
    this.toasterService.error(this.textValue, "ERROR");
  }

  createInfo() {
    this.toasterService.info(this.textValue, "INFORMATION")
  }

  openModal() {
    this.modalDispaySubject$.next(true);
  }

  updateLastSaveTime() {
    // since the assignState action allows undefined props, we only need to include the props we want to update.
    this.store.dispatch(gameAction.assignState({overwrite: {lastUpdated: new Date()}}))
  }

  // irrelevant now
  updateExampleProp() {
    // let exampleValue = "********************************".split("").map(star => {
    //   return "abcdefghijklmnopqrstuvwxyz".split('')[Math.floor(Math.random() * 26)]
    // }).join('');
    // this.store.dispatch(gameAction.assignState({overwrite: {exampleProperty: exampleValue}}))
  }

  updateBoth() {
    // let exampleValue = "********************************".split("").map(star => {
    //   return "abcdefghijklmnopqrstuvwxyz".split('')[Math.floor(Math.random() * 26)]
    // }).join('');
    // this.store.dispatch(gameAction.assignState({
    //   overwrite:
    //     {
    //       exampleProperty: exampleValue,
    //       lastUpdated: new Date()
    //     }
    // }));
  }

}
