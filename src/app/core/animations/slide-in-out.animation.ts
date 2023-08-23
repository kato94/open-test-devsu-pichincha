import { trigger, style, animate, transition } from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
  transition(':enter', [
    style({ height: '0' }),
    animate('250ms ease-in', style({ height: '*' }))
  ]),
  transition(':leave', [
    style({ height: '*' }),
    animate('250ms ease-in', style({ height: '0' }))
  ])
]);
