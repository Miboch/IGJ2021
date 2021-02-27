import {Component, OnInit} from '@angular/core';
import {EntityManagerSystem} from '../../../../game/systems/entity-manager.system';
import {Transform} from '../../../../game/components/transform';
import {Sprite} from '../../../../game/components/sprite';
import {Cursor} from '../../../../game/components/cursor';
import {CursorSystem} from '../../../../game/systems/cursor.system';
import {ToastService} from '../../../../ui/services/toast-service';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  constructor(private entitySystem: EntityManagerSystem, private cursor: CursorSystem, private toast: ToastService) {
  }

  ngOnInit(): void {
    this.entitySystem.createEntitiy().addComponents(
      new Transform(100 + Math.floor(Math.random() * 700), 100 + Math.floor(Math.random() * 450), Math.floor(1 + Math.random() * 2)),
      new Sprite("assets/game/drill.png"),
      new Cursor()
    );

    this.cursor.listenForClickedEntities().subscribe(clicked => {
      clicked.forEach(e => {
        this.toast.success(`clicked entitiy ${e.id}`, 'Click Detected')
      })
    });

  }

  createRandomDrill() {
    this.entitySystem.createEntitiy().addComponents(
      new Transform(100 + Math.floor(Math.random() * 700), 100 + Math.floor(Math.random() * 450), Math.floor(1 + Math.random() * 2)),
      new Sprite("assets/game/drill.png"),
      new Cursor()
    );
  }

}
