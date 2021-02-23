import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FeedbackModel} from '../models/feedback.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class FeedbackService {
  apiPath = environment.apiRoot + "/api/feedback"

  constructor(private http: HttpClient) {
  }

  postFeedback(feedbackModel: FeedbackModel) {
    return this.http.post(this.apiPath, feedbackModel);
  }

  markRead(id: number) {
    return this.http.put(this.apiPath + `/${id}`, {});
  }

  getFeedback(): Observable<FeedbackModel[]> {
    return this.http.get<FeedbackModel[]>(this.apiPath);
  }

  getSpecificFeedback(id: number): Observable<FeedbackModel> {
    return this.http.get<FeedbackModel>(this.apiPath + `/${id}`);
  }

}
