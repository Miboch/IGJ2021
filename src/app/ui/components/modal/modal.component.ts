import {
  Component,
  ContentChild, HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {ModalContentDirective, ModalHeaderDirective} from '../../directives';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'igj-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit, OnDestroy, OnChanges {

  @ContentChild(ModalContentDirective, {read: TemplateRef}) modalContent!: TemplateRef<any>;
  @Input() modalDisplay$: Subject<boolean>
  @Input() modalDisplayState: boolean = false;
  modalDisplayStateSubscription: Subscription;
  @ContentChild(ModalHeaderDirective, {read: TemplateRef}) modalHeader!: TemplateRef<any>;

  @HostListener('window:keydown.escape')
  escapePressed() {
    if (this.modalDisplayState) {
      this.closeModal();
    }
  }

  constructor() {
    this.modalDisplay$ = new Subject<boolean>();
    this.modalDisplayStateSubscription = new Subscription();
    this.setupModalStateActions();
  }

  ngOnInit(): void {
    this.modalDisplay$.subscribe(r => console.log(r));
  }

  ngOnDestroy() {
    this.modalDisplayStateSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('modalDisplay$' in changes) {
      this.setupModalStateActions();
    }
  }

  setupModalStateActions() {
    this.modalDisplayStateSubscription.unsubscribe();
    this.modalDisplayStateSubscription = this.modalDisplay$.subscribe(display => {
      this.modalDisplayState = display;
    });
  }

  closeModal() {
    this.modalDisplay$.next(false);
  }


}
