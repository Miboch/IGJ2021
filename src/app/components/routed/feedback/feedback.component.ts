import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../../../services/feedback.service';
import {FeedbackModel} from '../../../models/feedback.model';

@Component({
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {

  feedback: FeedbackModel[];

  constructor(private feedbackService: FeedbackService) {
    this.feedback = [];
  }

  ngOnInit(): void {
    this.feedbackService.getFeedback().subscribe(feedbackCollection => {
      this.feedback = feedbackCollection;
    });
  }
}

