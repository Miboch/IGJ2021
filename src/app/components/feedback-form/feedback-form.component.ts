import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FeedbackService} from '../../services/feedback.service';
import {ToastService} from '../../services/toast-service';

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

  constructor(private fb: FormBuilder, private service: FeedbackService) {
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
        submitted: new Date()
      }).subscribe(postFeedback => {
        console.log(postFeedback);
      });
      this.resetForm();
    }

  }

}
