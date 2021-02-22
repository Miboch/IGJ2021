import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserInformationModel} from '../models/user-information.model';
import {UserDtoModel} from '../models/user-dto.model';
import {TokenResponseModel} from '../models/token-response.model';
import jwtDecode from 'jwt-decode';
import {DeserializedJwtModel} from '../models/deserialized-jwt.model';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../models/state/application-state';
import * as userAction from '../store/actions/user.actions';
import * as userSelect from '../store/selectors/user.selector';
import {Router} from '@angular/router';
import {ToastService} from './toast-service';


@Injectable({providedIn: 'root'})
export class LoginService {
  apiUsernameCheck = environment.apiRoot + "/api/taken";
  apiRegister = environment.apiRoot + '/api/register';
  apiLogin = environment.apiRoot + '/api/login'
  isLoggedIn$: Observable<boolean> = this.store.select(userSelect.isLoggedIn);
  userDetails$: Observable<UserInformationModel> = this.store.select(userSelect.userDetails);

  constructor(private http: HttpClient,
              private store: Store<ApplicationState>,
              private router: Router,
              private toastService: ToastService) {
  }

  get loggedIn() {
    return this.isLoggedIn$;
  }

  get userDetails() {
    return this.userDetails$;
  }

  checkUsername(potentialName: string) {
    return this.http.get(this.apiUsernameCheck + `/${potentialName}`);
  }

  registerUser(details: UserDtoModel): Observable<TokenResponseModel> {
    return this.http.post<TokenResponseModel>(this.apiRegister, details);
  }

  login(details: UserDtoModel): Observable<TokenResponseModel> {
    return this.http.post<TokenResponseModel>(this.apiLogin, details);
  }

  processJWTandLogin(tokenResponse: TokenResponseModel) {
    this.store.dispatch(userAction.loginSuccess({
      jwt: {
        ...jwtDecode<DeserializedJwtModel>(tokenResponse.token),
        token: tokenResponse.token
      }
    }));
    this.toastService.success("", "Login Successful");
    this.router.navigate(['/game']);
  }

  logout() {
    this.store.dispatch(userAction.logout());
    this.toastService.success("You have been logged out", "Logout Successful");
    this.router.navigate(['/game']);
  }

}
