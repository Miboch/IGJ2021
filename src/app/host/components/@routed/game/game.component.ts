import {Component, OnInit} from '@angular/core';
import {EntityManagerSystem} from '../../../../game/systems/entity-manager.system';
import {Transform} from '../../../../game/components/transform';
import {Sprite} from '../../../../game/components/sprite';
import {Hoverable} from '../../../../game/components/hoverable';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  constructor(private entitySystem: EntityManagerSystem) {
  }

  ngOnInit(): void {
    this.entitySystem.createEntitiy().addComponents(
      new Transform(100 + Math.floor(Math.random() * 700), 100 + Math.floor(Math.random() * 450), Math.floor(1 + Math.random() * 2)),
      new Sprite("assets/game/drill.png"),
      new Hoverable()
    );
  }

  createRandomDrill() {
    this.entitySystem.createEntitiy().addComponents(
      new Transform(100 + Math.floor(Math.random() * 700), 100 + Math.floor(Math.random() * 450), Math.floor(1 + Math.random() * 2)),
      new Sprite("assets/game/drill.png"),
      new Hoverable()
    );
  }

}
