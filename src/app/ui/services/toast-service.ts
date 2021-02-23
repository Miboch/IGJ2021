import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ToasterModel} from '../models/toaster.model';
import {ToasterTypeModel} from '../models/toaster-type.model';

@Injectable({providedIn: 'root'})
export class ToastService {

  toasterSubject: Subject<ToasterModel>;

  constructor() {
    this.toasterSubject = new Subject<ToasterModel>();
  }


  success(msg: string, title: string): void {
    this.toasterSubject.next({
      text: msg,
      title,
      type: ToasterTypeModel.SUCCESS
    });
  }

  warn(msg: string, title: string): void {
    this.toasterSubject.next({
      text: msg,
      title,
      type: ToasterTypeModel.WARNING
    });
  }

  info(msg: string, title: string): void {
    this.toasterSubject.next({
      text: msg,
      title,
      type: ToasterTypeModel.INFO
    });
  }

  error(msg: string, title: string): void {
    this.toasterSubject.next({
      text: msg,
      title,
      type: ToasterTypeModel.ERROR
    });
  }

}
