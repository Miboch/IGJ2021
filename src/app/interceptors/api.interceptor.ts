import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../models/state/application-state';
import * as userSelector from '../store/selectors/user.selector';
import {Observable, of} from 'rxjs';
import {map, switchMap, take, withLatestFrom} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ApiInterceptor implements HttpInterceptor {

  constructor(private store: Store<ApplicationState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(userSelector.isLoggedIn).pipe(
      take(1),
      withLatestFrom(this.store.select(userSelector.getUserToken)),
      switchMap(([loggedIn, token]: [boolean, string]) => {
        if (!loggedIn)
          return next.handle(req)
        return next.handle(req.clone({setHeaders: {Authorization: "Bearer " + token}}))
      })
    );
  }
}
