import {AfterViewChecked, Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({selector: '[appScrollToCenter]'})
export class ScrollToCenterDirective implements AfterViewChecked {

  @Input() smoothBehavior = false;
  private scrolled = false;

  @HostListener('click', ['$event']) onClick() {
    this.scrollToCenter();
  }

  ngAfterViewChecked(): void {
    if (this.isActive && !this.scrolled) {
      this.scrollToCenter();
      this.scrolled = true;
    }
  }

  constructor(private elRef: ElementRef) {
  }

  get isActive() {
    return this.elRef.nativeElement.classList.contains('active');
  }

  private scrollToCenter() {
    this.elRef.nativeElement.scrollIntoView(
      {
        behavior: this.smoothBehavior ? 'smooth' : 'auto',
        block: 'center',
        inline: 'center'
      });
  }
}
