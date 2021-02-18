import {Injectable} from '@angular/core';
import {ToastOutletDirective} from '../directives';

@Injectable({providedIn: 'root'})
export class ToastService {

  constructor(private outlet: ToastOutletDirective) {
    console.log(outlet);
  }


  success(msg: string): void {

  }

  warn(msg: string): void {

  }

  error(msg: string): void {

  }

}
