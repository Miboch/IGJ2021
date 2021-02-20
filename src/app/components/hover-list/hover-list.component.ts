import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {ListHeaderDirective, ListItemDirective} from '../../directives';

@Component({
  selector: 'igj-hover-list',
  templateUrl: './hover-list.component.html',
  styleUrls: ['./hover-list.component.scss']
})

export class HoverListComponent implements OnInit, OnChanges {

  @Input() items: any[];
  @Input() items$!: Observable<any[]>;
  @Output() listItemClicked: EventEmitter<any>;
  @ContentChild(ListHeaderDirective, {read: TemplateRef}) listHeaderTemplate!: TemplateRef<any>;
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate!: TemplateRef<any>;

  constructor() {
    this.items = [];
    this.listItemClicked = new EventEmitter<any>();
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

  clickHandler(item: any) {
    this.listItemClicked.emit(item);
  }

}
