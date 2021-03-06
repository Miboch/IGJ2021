﻿import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FeedbackService} from '../../services/feedback.service';
import {ToastService} from '../../../ui/services/toast-service';

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

  constructor(private fb: FormBuilder, private service: FeedbackService, private toastService: ToastService) {
    this.feedbackFormGroup = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return this.fb.group({
      rating: this.fb.control(0, [Validators.min(0), Validators.max(5)]),
      feedbackType: this.fb.control('', [Validators.required]),
      description: this.fb.control('')
    });
  }

  resetForm() {
    this.feedbackFormGroup = this.createForm();
  }

  submitForm() {
    if (this.feedbackFormGroup.valid) {
      this.service.postFeedback({
        description: this.feedbackFormGroup.get('description')?.value,
        rating: this.feedbackFormGroup.get('rating')?.value,
        type: this.feedbackFormGroup.get('feedbackType')?.value,
        read: false,
      }).subscribe(postFeedback => {
        let feedbackMessage = "Thank you for your feedback!";
        if (this.feedbackFormGroup.get('feedbackType')?.value === "Facts About Dogs") {
          feedbackMessage = "🐶 Thank you for your feedback! 🐶";
        }
        this.toastService.success(feedbackMessage, "Form submitted");
        this.resetForm();
      });

    }

  }

}
