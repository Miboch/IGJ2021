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

  }

  createRandomDrill() {
    this.entitySystem.createEntitiy().addComponents(
      new Transform(100 + Math.floor(Math.random() * 700), 100 + Math.floor(Math.random() * 450)),
      new Sprite("assets/game/drill.png")
    );
  }

}
