import {
  AfterViewInit,
  Component,
  ContentChild, ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef, ViewChild
} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ListHeaderDirective, ListItemDirective} from '../../directives';

@Component({
  selector: 'igj-hover-list',
  templateUrl: './hover-list.component.html',
  styleUrls: ['./hover-list.component.scss']
})

export class HoverListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() items: any[];
  @Input() items$!: Observable<any[]>;
  @Output() listItemClicked: EventEmitter<any>;
  @ContentChild(ListHeaderDirective, {read: TemplateRef}) listHeaderTemplate!: TemplateRef<any>;
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate!: TemplateRef<any>;
  @ViewChild('hoverbinding') hoverContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('itemsBinding') itemsBinding!: ElementRef<HTMLDivElement>;
  hoverLeftState = true;
  hoverRightState = false;
  hoverSubscription: Subscription
  isHovering = false;

  constructor() {
    this.items = [];
    this.listItemClicked = new EventEmitter<any>();
    this.hoverSubscription = new Subscription();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('items$' in changes) {
      this.items$.pipe(take(1)).subscribe(updatedCollection => {
        this.items = updatedCollection;
      })
    }
  }

  ngAfterViewInit() {
    this.hoverSubscription.add(
      fromEvent(this.hoverContainer.nativeElement, "mouseover").pipe(
        map(ev => this.itemsBinding.nativeElement.getBoundingClientRect())
      ).subscribe((bounds: DOMRect) => {
        // only check position if not previously hovering.
        if (!this.isHovering) {
          this.isHovering = true;
          this.hoverLeftState = bounds.right < window.innerWidth;
          this.hoverRightState = !this.hoverLeftState;
        }
      })
    );
    this.hoverSubscription.add(
      fromEvent(this.hoverContainer.nativeElement, "mouseleave").subscribe(_ => {
        // reset the hovering state.
        this.isHovering = false;
        this.hoverLeftState = true;
        this.hoverRightState = false;
      })
    );
  }

  ngOnDestroy() {
    this.hoverSubscription.unsubscribe();
  }

  clickHandler(item: any) {
    this.listItemClicked.emit(item);
  }

  get hoverLeft() {
    return this.hoverLeftState
  }

  get hoverRight() {
    return this.hoverRightState;
  }


}
