import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'igj-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  // Only defining recipes here for testing, define them in some other file/service.
  // Also, use enums for the name probably
  recipes: Recipe[] = [
    { name: "drill", ore: 10, energy: 10 },
    { name: "satellite", ore: 10, energy: 10 },
    { name: "drill factory", ore: 100, energy: 100 },
    { name: "satellite factory", ore: 100, energy: 100 },
  ];

  constructor(private store: Store) {}

  craft(recipe: Recipe) {
    // dispatch craft action
  }

  canCraft(recipe: Recipe): boolean {
    // subscribe and take one from the store to determine if the recipe can be crafted
    // There's probably a much better way of doing this than with a function, figure out when
    // the store structure is setup
    // just doing this for now to showcase disabled styles
    return recipe.energy < 11;
  }
}

// Just for setting up UI, put this somewhere else, and determine the best structure for this
class Recipe {
  name = '';
  ore = 0;
  energy = 0;
}
