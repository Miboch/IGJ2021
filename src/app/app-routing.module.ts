import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeedbackComponent, GameComponent, TestPageComponent} from './components';
import {FeedbackResolver} from './resolvers/feedback.resolver';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
