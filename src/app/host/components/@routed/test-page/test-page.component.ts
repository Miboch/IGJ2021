import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {GameState} from '../../../../game/models/state/game-state';
import * as gameSelector from '../../../../game/store/selectors/game-state.selectors';
import * as gameAction from '../../../../game/store/actions/game-state.actions';
import * as userSelector from '../../../store/selectors/user.selector';
import {SaveStateModel} from '../../../../game/models/state/save-state.model';
import {ToastService} from '../../../../ui/services/toast-service';
import {RendererSystem} from '../../../../game/systems/renderer.system';


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
              private render: RendererSystem) {
    this.modalDispaySubject$ = new Subject<boolean>();
  }

  ngOnInit(): void {
    // selecting a game state and subscribing to it will automatically update the property every time
    // we dispatch a new state unless you specifically unsubscribe, such as via take(1), or manually.
    this.store.select(gameSelector.getLastUpdated).subscribe(updateTime => {
      this.lastGameSaveTime = updateTime;
    });
    this.render.canvasTarget = document.createElement('canvas');
    this.render.animationLoop(0);
    this.render.animating = true;

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

  updateExampleProp() {


    let exampleValue = "********************************".split("").map(star => {
      return "abcdefghijklmnopqrstuvwxyz".split('')[Math.floor(Math.random() * 26)]
    }).join('');


    this.store.dispatch(gameAction.assignState({overwrite: {exampleProperty: exampleValue}}))
  }

  updateBoth() {
    let exampleValue = "********************************".split("").map(star => {
      return "abcdefghijklmnopqrstuvwxyz".split('')[Math.floor(Math.random() * 26)]
    }).join('');
    this.store.dispatch(gameAction.assignState({
      overwrite:
        {
          exampleProperty: exampleValue,
          lastUpdated: new Date()
        }
    }));

  }


  handleClick(event: any) {
    console.log(event);
  }


}
