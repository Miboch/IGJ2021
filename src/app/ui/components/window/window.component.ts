import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'igj-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})

export class WindowComponent implements OnInit, OnChanges {
  @Input() windowTitle = "";
  @Input() display = false;
  @Input() displayState$!: Observable<boolean>;
  @Output() closing: EventEmitter<void>;
  private changeStateSubscription!: Subscription;

  constructor() {
    this.closing = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('displayState$' in changes) {
      if (this.changeStateSubscription) {
        this.changeStateSubscription.unsubscribe();
      }
      this.changeStateSubscription = this.displayState$.subscribe(state => {
        this.display = state;
      });
    }
  }

  closeWindow() {
    this.closing.emit();
    this.display = false;
  }

}
