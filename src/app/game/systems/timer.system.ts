import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {filter, switchMap, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TimerSystem {
  private _paused = false;
  private _firstInitializing = true;
  private timerSubject: Subject<number> = new Subject<number>();


  constructor() {
    this.startTimer();
  }

  /**
   * Note: The inner timer is running on a requestAnimationFrame, so for some browsers anything over 60 UPS won't
   * be possible
   * @param updatesPrSec
   */
  getWithUPS(updatesPrSec: number): Observable<number> {
    return (() => {
      let lastFrame = 0;
      let delta = 0;
      return this.timerSubject.asObservable().pipe(switchMap(frameTime => {
          delta += !this._paused ? frameTime - lastFrame : 0;
          lastFrame = frameTime;
          return of(Number((delta / 1000).toFixed(2)));
        }),
        filter(_ => delta > (1000 / updatesPrSec) && !this._paused),
        tap(_ => delta = 0)
      );
    })();
  }

  set pause(p: boolean) {
    this._paused = p;
  }

  private startTimer() {
    if (this._firstInitializing) {
      this._firstInitializing = false;
      this.timerLoop(0);
    }
  }

  // requestAnimationFrame utilized for timing rather than setInterval since we want to go as fast as possible.
  private timerLoop(timeSinceLast: number) {
    this.timerSubject.next(timeSinceLast);
    requestAnimationFrame(e => this.timerLoop(e));
  }


}
