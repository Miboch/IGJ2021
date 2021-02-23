import {Injectable} from '@angular/core';
import {FeedbackModel} from '../models/feedback.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {FeedbackService} from '../services/feedback.service';

@Injectable({providedIn: 'root'})
export class FeedbackResolver implements Resolve<FeedbackModel[]> {

  constructor(private feedbackService: FeedbackService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FeedbackModel[]> | Promise<FeedbackModel[]> | FeedbackModel[] {
    return this.feedbackService.getFeedback();
  }

}
