import {animate, style, transition, trigger} from '@angular/animations';

export const slideAnimation = trigger('panelSlide', [
  transition(':enter', [
    style({transform: 'translateX(100%)'}),
    animate('300ms', style({transform: 'translateX(0)'})),
  ]),
  transition(':leave', [
    animate('300ms', style({transform: 'translateX(100%)'}))
  ])
]);
