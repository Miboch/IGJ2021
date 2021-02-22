import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {slideAnimation, slideLoginCard, slideSignupCard} from '../../../animations/slide.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../services/login.service';
import {fromEvent, of, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, map, tap} from 'rxjs/operators';
import {UserDtoModel} from '../../../models/user-dto.model';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [slideLoginCard, slideSignupCard]
})

export class SignInComponent implements OnInit {
  loggingIn: boolean = true;

  loginGroup: FormGroup;
  signupGroup: FormGroup;

  usernameTaken = false;
  mismatchedPassword = false;

  @ViewChild('matcher', {static: false}) matcher!: ElementRef<HTMLInputElement>;
  @ViewChild('username', {static: false}) usernameCheck!: ElementRef<HTMLInputElement>;
  matchSubscriptions: Subscription;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.matchSubscriptions = new Subscription();

    this.loginGroup = this.formBuilder.group({
      'username': this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      'password': this.formBuilder.control('', [Validators.required])
    });
    this.signupGroup = this.formBuilder.group({
      'username': this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      'password': this.formBuilder.control('', [Validators.required]),
      'repeat': this.formBuilder.control('', [Validators.required]),
    });
  }


  get loginUsernameError() {
    return !this.loginGroup.get('username')?.valid && this.loginGroup.dirty
  }

  get loginPasswordError() {
    return !this.loginGroup.get('password')?.valid && this.loginGroup.dirty
  }

  get signupUsernameError() {
    return !this.signupGroup.get('username')?.valid && this.signupGroup.dirty
  }

  get signupPasswordError() {
    return !this.signupGroup.get('password')?.valid && this.signupGroup.dirty
  }

  get passwordMismatchError() {
    return this.mismatchedPassword;
  }

  get usernameTakenError() {
    return this.usernameTaken;
  }

  tryLogin() {
    this.loginGroup.markAsDirty();
    if (!this.loginGroup.errors) {
      this.loginService.login({
        username: this.loginGroup.get('username')?.value,
        hash: this.loginGroup.get('password')?.value
      } as UserDtoModel)
        .pipe(catchError(err => {
          // TODO: Alert invalid credentials
          return of(null)
        }))
        .subscribe(r => {
          if (r == null) return;
          this.loginService.processJWTandLogin(r);
        });
    }
  }

  trySignup() {
    this.signupGroup.markAsDirty();
    this.mismatchedPassword = !(this.signupGroup.get('password')?.value == this.signupGroup.get('repeat')?.value);
    if (this.mismatchedPassword || this.usernameTaken)
      return
    this.loginService.registerUser({
      hash: this.signupGroup.get('password')?.value,
      username: this.signupGroup.get('username')?.value,
    } as UserDtoModel).subscribe(loginToken => {
      this.loginService.processJWTandLogin(loginToken)
      this.signupGroup.reset();
    })
  }

  ngOnInit(): void {
  }

  switchContext() {
    this.loggingIn = !this.loggingIn;
    if (!this.loggingIn) {
      setTimeout(() => {
        this.matchSubscriptions.unsubscribe();
        this.matchSubscriptions = new Subscription();
        this.matchSubscriptions.add(
          fromEvent(this.matcher.nativeElement, 'keyup').pipe(distinctUntilChanged()).subscribe(event => {
              this.mismatchedPassword = !(this.signupGroup.get('password')?.value == this.signupGroup.get('repeat')?.value)
            }
          )
        );

        this.matchSubscriptions.add(
          fromEvent(this.usernameCheck.nativeElement, 'keyup').pipe(
            map(v => this.signupGroup.get('username')?.value),
            filter(username => {
              return username.length >= 3
            }),
            debounceTime(400),
            distinctUntilChanged(),
            tap(u => this.usernameTaken = false)
          ).subscribe(checkUsername => {
            this.loginService.checkUsername(checkUsername).pipe(catchError(err => {
              this.usernameTaken = true;
              return of(err);
            })).subscribe(r => {
            })
          })
        );
      })
    }
  }
}
