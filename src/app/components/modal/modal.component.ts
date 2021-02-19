import {Component, ContentChild, OnInit, TemplateRef} from '@angular/core';
import {ModalContentDirective, ModalHeaderDirective} from '../../directives';

@Component({
  selector: 'igj-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

  @ContentChild(ModalHeaderDirective, {read: TemplateRef}) modalHeader!: TemplateRef<any>;
  @ContentChild(ModalContentDirective, {read: TemplateRef}) modalContent!: TemplateRef<any>;
  constructor() {
  }

  ngOnInit(): void {
  }
}
