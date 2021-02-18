import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../services/toast-service';

@Component({
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})

export class TestPageComponent implements OnInit {
  textValue = "";

  constructor(private toasterService: ToastService) {
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

}
