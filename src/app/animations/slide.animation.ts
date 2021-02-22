import {animate, style, transition, trigger} from '@angular/animations';
import {delay} from 'rxjs/operators';

export const slideAnimation = trigger('panelSlide', [
  transition(':enter', [
    style({transform: 'translateX(100%)'}),
    animate('300ms', style({transform: 'translateX(0)'})),
  ]),
  transition(':leave', [
    animate('300ms', style({transform: 'translateX(100%)'}))
  ])
]);


export const slideLoginCard = trigger('loginCard', [
  transition(':enter', [
    style({right: '100%'}),
    animate('150ms', style({right: 0}))
  ])
]);

export const slideSignupCard = trigger('signupCard', [
  transition(':enter', [
    style({left: '100%'}),
    animate('150ms', style({left: 0})),
  ])
]);
