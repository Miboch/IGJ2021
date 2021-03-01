import {Injectable} from '@angular/core';
import {TimerSystem} from './timer.system';
import {Subscription} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MovementSystem {
  private readonly UPS = 60;
  private internalSubscription: Subscription;


  constructor(private timer: TimerSystem) {
    this.internalSubscription = this.timer.getWithUPS(this.UPS).subscribe(deltaTime => {

    });

  }


  moveEntities(deltaTime: number) {

  }


}
