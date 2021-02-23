import {Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {ListHeaderDirective, ListItemDirective} from '../../directives';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'igj-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];
  @Input() items$!: Observable<any[]>;
  itemsSubscription: Subscription;

  @ContentChild(ListHeaderDirective, {read: TemplateRef}) listHeader!: TemplateRef<any>;
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItem!: TemplateRef<any>;

  constructor() {
    this.itemsSubscription = new Subscription();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('items$' in changes) {
      this.itemsSubscription.unsubscribe();
      this.itemsSubscription = this.items$.subscribe(
        values => this.items = values
      );
    }
  }

}
