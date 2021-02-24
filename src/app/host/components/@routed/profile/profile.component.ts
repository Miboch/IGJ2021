import {Component, OnInit} from '@angular/core';
import {UserInformationModel} from '../../../models/user-information.model';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../models/state/application-state';
import * as userSelect from '../../../store/selectors/user.selector';


/**
 * Allows the user to see their game stats, and reset their save game should they desire to do so.
 */
@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  userInfo!: UserInformationModel;
  token!: string;

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit(): void {
    this.store.select(userSelect.userDetails).subscribe(details => {
      this.userInfo = details;
    });
    this.store.select(userSelect.getUserToken).subscribe(r => {
      this.token = r;
    });


  }
}
