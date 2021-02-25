import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AboutComponent,
  FeedbackComponent,
  GameComponent,
  ProfileComponent,
  SignInComponent,
  TestPageComponent
} from './host/components';
import {FeedbackResolver} from './host/resolvers/feedback.resolver';
import {LoginGuard} from './host/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'test',
    component: TestPageComponent
  },
  {
    path: 'feedback',
    resolve: {feedback: FeedbackResolver},
    component: FeedbackComponent
  },
  {
    path: 'feedback/:id',
    resolve: {feedback: FeedbackResolver},
    component: FeedbackComponent
  },
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
