import {Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {CardContentDirective, CardHeaderDirective} from '../../directives';

@Component({
  selector: 'igj-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit, OnChanges {
  @ContentChild(CardContentDirective, {read: TemplateRef}) cardContent!: TemplateRef<any>
  @ContentChild(CardHeaderDirective, {read: TemplateRef}) cardHeader!: TemplateRef<any>
  classList: string;
  @Input() colour: "surface" | "lemon" | "raspberry" = "surface";

  constructor() {
    this.classList = 'card-container ' + 'surface ';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('colour' in changes) {
      this.classList = 'card-container ' + this.colour;
    }
  }

}
