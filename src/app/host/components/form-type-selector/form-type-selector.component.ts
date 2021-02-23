import {AfterViewInit, Component, forwardRef, Injector, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'igj-form-type-selector',
  templateUrl: './form-type-selector.component.html',
  styleUrls: ['./form-type-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTypeSelectorComponent),
      multi: true
    }
  ]
})

export class FormTypeSelectorComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() selectOptions: string[] = [];
  selectedOption: string = "";
  control!: FormControl;
  onChanges!: (param: any) => void;

  constructor(private injector: Injector) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const ngControl: (NgControl | null) = this.injector.get(NgControl, null);
    if (ngControl) {
      this.control = ngControl.control as FormControl;
    }
  }

  registerOnChange(fn: any): void {
    this.onChanges = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.selectedOption = obj;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.onChanges(this.selectedOption);
  }
}
