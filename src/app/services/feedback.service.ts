import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FeedbackModel} from '../models/feedback.model';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class FeedbackService {
  apiPath = environment.apiRoot + "/api/feedback"


  constructor(private http: HttpClient) {
  }

  postFeedback(feedbackModel: FeedbackModel) {
    return this.http.post(this.apiPath, feedbackModel);
  }


}
