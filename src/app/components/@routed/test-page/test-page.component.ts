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
    this.toasterService.warn(this.textValue, "WARNING");
  }

  createSuccess() {
    this.toasterService.success(this.textValue, "SUCCESS");
  }

  createError() {
    this.toasterService.error(this.textValue, "ERROR");
  }

  createInfo() {
    this.toasterService.info(this.textValue, "INFORMATION")
  }

  openModal() {
    this.modalDispaySubject$.next(true);
  }

  handleClick(event: any) {
    console.log(event);
  }


}
