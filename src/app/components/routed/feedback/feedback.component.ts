import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../../../services/feedback.service';
import {FeedbackModel} from '../../../models/feedback.model';
import {Subject} from 'rxjs';
import {FeedbackTypes} from '../../../models/feedback-types.model';

@Component({
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {
  fbSubject: Subject<FeedbackModel[]>;

  constructor(private feedbackService: FeedbackService) {
    this.fbSubject = new Subject<FeedbackModel[]>();
  }

  ngOnInit(): void {
    this.feedbackService.getFeedback().subscribe(r => {
      this.fbSubject.next(r);
    })
  }
}

