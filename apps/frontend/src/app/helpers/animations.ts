import {trigger, state, style, transition, animate} from '@angular/animations';

export const selectedTrigger = trigger('selectedState', [
  state('default', style('*')),
  state('selected', style('*')),
  transition('default => selected', [
    animate('300ms ease-out', style({transform: 'scale(1.1)'})),
  ])
]);

export const showTrigger = trigger('showState', [
  transition(':enter', [
    style({opacity: 0}),
    animate(600)
  ]),
  transition(':leave', animate(600, style({opacity: 0})))
]);

export const slideTrigger = trigger('slideState', [
  state('default', style('*')),
  state('slided', style('*')),
  transition('default => slided', [
    style({transform: 'translateY(+200%)'}),
    animate('500ms ease-out', style({transform: 'translateY(0)'}))
  ])
]);
