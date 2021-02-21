import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../../../services/feedback.service';
import {FeedbackModel} from '../../../models/feedback.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {FeedbackTypes} from '../../../models/feedback-types.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {
  fbSubject: BehaviorSubject<FeedbackModel[]>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.fbSubject = new BehaviorSubject<FeedbackModel[]>([]);
    this.activatedRoute.data.subscribe(data => {
      this.fbSubject.next(data['feedback']);
    });
  }

  ngOnInit(): void {

  }
}

