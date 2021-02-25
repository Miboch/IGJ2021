import {Component, OnInit} from '@angular/core';
import {EntityManagerSystem} from '../../../../game/systems/entity-manager.system';
import {ComponentTypes} from '../../../../game/components/component-types';
import {Transform} from '../../../../game/components/transform';
import {Sprite} from '../../../../game/components/sprite';
import {PowerGenerator} from '../../../../game/components/power-generator';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  constructor(private entitySystem: EntityManagerSystem) {
  }

  ngOnInit(): void {
    // this.entitySystem.createEntitiy().addComponents(
    //   new Transform(0, 0, 2, 40),
    //   new Sprite("assets/game/drill.png"),
    // );
    //
    // this.entitySystem.createEntitiy().addComponents(
    //   new Transform(300, 500, 2),
    //   new Sprite("assets/game/drill.png")
    // );
    //
    // this.entitySystem.createEntitiy().addComponents(
    //   new Transform(200, 310, 1),
    //   new Sprite("assets/game/satellite.png"),
    //   new PowerGenerator(10)
    // );

  }

  createRandomDrill() {
    this.entitySystem.createEntitiy().addComponents(
      new Transform(100 + Math.floor(Math.random() * 700), 100 + Math.floor(Math.random() * 450)),
      new Sprite("assets/game/drill.png")
    );
  }

}
