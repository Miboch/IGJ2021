import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HoverMenuModel} from '../../models/hover-menu.model';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'igj-signin-menu',
  templateUrl: './signin-menu.component.html',
  styleUrls: ['./signin-menu.component.scss']
})

export class SigninMenuComponent implements OnInit {
  actions: HoverMenuModel[];

  constructor(private router: Router, private loginService: LoginService) {
    this.actions = [
      {
        actionText: 'Profile',
        callbackAction: () => {
          this.goToProfile();
        }
      },
      {
        actionText: 'Logout',
        callbackAction: () => {
          this.logout();
        }
      }
    ]
  }

  ngOnInit(): void {
  }

  get loggedIn$() {
    return this.loginService.loggedIn;
  }

  get user() {
    return this.loginService.userDetails;
  }

  goToLoggedIn() {
    this.router.navigate(["/login"])
  }

  goToProfile() {
    this.router.navigate(["/profile"]);
  }

  logout() {

  }


  itemIsClicked(clickedItem: HoverMenuModel) {
    clickedItem.callbackAction();
  }

}
