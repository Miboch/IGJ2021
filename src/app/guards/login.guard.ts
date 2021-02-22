import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {LoginService} from '../services/login.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.loggedIn.pipe(tap(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/login'])
      }
    }));
  }
}
