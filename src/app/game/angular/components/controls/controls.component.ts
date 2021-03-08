import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GameState } from '../..';
import { getEnergy, getOre } from '../../store';

@Component({
  selector: 'igj-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnDestroy {
  // Only defining recipes here for testing, define them in some other file/service.
  // Also, use enums for the name probably
  energy!: number;
  ore!: number;
  // ore$ = this.store.select(getEnergy);
  recipes: Recipe[] = [
    { name: "drill", ore: 10, energy: 10 },
    { name: "satellite", ore: 10, energy: 10 },
    { name: "drill factory", ore: 100, energy: 100 },
    { name: "satellite factory", ore: 100, energy: 100 },
  ];
  subscriptions: Subscription[] = [];

  constructor(private store: Store<GameState>) {
    this.subscriptions.push(this.store.select(getEnergy).subscribe((energy: number) => {
      this.energy = energy;
    }));
    this.subscriptions.push(this.store.select(getOre).subscribe((ore: number) => {
      this.ore = ore;
    }));
  }

  craft(recipe: Recipe) {
    // dispatch craft action
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subcription => subcription.unsubscribe());
  }
}

// Just for setting up UI, put this somewhere else, and determine the best structure for this
class Recipe {
  name = '';
  ore = 0;
  energy = 0;
}
