import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../services/toast-service';
import {Subject} from 'rxjs';

@Component({
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})

export class TestPageComponent implements OnInit {
  textValue = "";
  modalDispaySubject$: Subject<boolean>;

  constructor(private toasterService: ToastService) {
    this.modalDispaySubject$ = new Subject<boolean>();
  }

  ngOnInit(): void {
  }

  createWarn() {
    this.toasterService.warn(this.textValue, "TEST");
  }

  createSuccess() {
    this.toasterService.success(this.textValue, "TEST");
  }

  createError() {
    this.toasterService.error(this.textValue, "TEST");
  }

  openModal() {
    this.modalDispaySubject$.next(true);
  }

  handleClick(event: any) {
    console.log(event);
  }


}
