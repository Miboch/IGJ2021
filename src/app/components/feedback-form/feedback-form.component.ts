import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'igj-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})

export class FeedbackFormComponent implements OnInit {
  feedbackFormGroup: FormGroup;
  feedbackTypeOptions: string[] = [
    "Bug Report",
    "Feature Request",
    "Review",
    "Facts About Dogs"
  ];

  constructor(private fb: FormBuilder) {
    this.feedbackFormGroup = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return this.fb.group({
      rating: this.fb.control(0, [Validators.min(0), Validators.max(5)]),
      feedbackType: this.fb.control(''),
      description: this.fb.control('')
    });
  }

  resetForm() {
    this.feedbackFormGroup = this.createForm();
  }

}
