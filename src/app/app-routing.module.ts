import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AttributionComponent, ChangelogComponent,
  FeedbackComponent,
  GameComponent,
  ProfileComponent,
  SignInComponent,
  TestPageComponent
} from './components';
import {FeedbackResolver} from './resolvers/feedback.resolver';
import {LoginGuard} from './guards/login.guard';

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
    path: 'credits',
    component: AttributionComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'changes',
    component: ChangelogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
