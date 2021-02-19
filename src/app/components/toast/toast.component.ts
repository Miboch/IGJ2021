import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ToasterTypeModel} from '../../models/toaster-type.model';

@Component({
  selector: 'igj-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})

export class ToastComponent implements OnInit {
  bottom: number;
  closeButtonEmitter: EventEmitter<void>;
  toastTypes = ToasterTypeModel;
  type: ToasterTypeModel = ToasterTypeModel.SUCCESS;
  title: string = "";
  message: string = "";

  @ViewChild('eminem') wrapperReference!: ElementRef; //(w)rapper reference, ha ha.

  constructor() {
    this.bottom = 16;
    this.closeButtonEmitter = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  get bottomPosition() {
    return `${this.bottom}px`;
  }

  public moveUp(byAmount: number) {
    this.bottom += byAmount;
  }
}
