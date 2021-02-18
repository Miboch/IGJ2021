import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'igj-icon-decorator',
  templateUrl: './icon-decorator.component.html',
  styleUrls: ['./icon-decorator.component.scss'],
  animations: []
})

export class IconDecoratorComponent implements OnInit {
  panelControl: Subject<boolean>;

  constructor() {
    this.panelControl = new Subject<boolean>();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.panelControl.next(true);
    })
  }

  openPanel() {
    this.panelControl.next(true);
  }
}
