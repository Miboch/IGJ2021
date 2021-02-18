import {AfterViewInit, Component, forwardRef, HostListener, Injector, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'igj-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})

export class RatingComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  maxRating = 5;
  rating = 0;
  currentHighlightValue = 0;
  onChanges!: (param: any) => void;
  control!: FormControl;

  @HostListener('mouseleave')
  stopHovering() {
    this.currentHighlightValue = 0;
  }

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
    this.rating = obj;
  }

  clickedStar(starValue: number) {
    this.rating = starValue;
    this.onChanges(this.rating);
  }

  hoverStar(starValue: number) {
    this.currentHighlightValue = starValue;
  }

}
