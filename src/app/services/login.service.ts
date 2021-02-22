import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserInformationModel} from '../models/user-information.model';

@Injectable({providedIn: 'root'})
export class LoginService {
  apiRoot = environment.apiRoot + "/api/user";

  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userDetails$: BehaviorSubject<UserInformationModel> = new BehaviorSubject<UserInformationModel>({
    id: "none",
    username: "User"
  });

  constructor(private http: HttpClient) {
  }


  get loggedIn() {
    return this.isLoggedIn$;
  }

  get userDetails() {
    return this.userDetails$;
  }

}
