import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'igj-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})

export class StarComponent implements OnInit {
  @Input() starValue!: number;
  @Input() currentRating = 0;
  @Input() highlightValue = 0;
  @Output() starValueEmitter: EventEmitter<number>;
  @Output() hoverValueEmitter: EventEmitter<number>;

  @HostListener('mouseenter')
  hover() {
    this.hoverValueEmitter.emit(this.starValue);
  }


  constructor() {
    this.starValueEmitter = new EventEmitter<number>();
    this.hoverValueEmitter = new EventEmitter<number>();
  }

  ngOnInit(): void {
  }

  emitStarValue() {
    this.starValueEmitter.emit(this.starValue);
  }


}
