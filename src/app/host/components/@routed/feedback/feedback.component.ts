import {Component, OnInit} from '@angular/core';
import {FeedbackModel} from '../../../models/feedback.model';
import {BehaviorSubject} from 'rxjs';
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

