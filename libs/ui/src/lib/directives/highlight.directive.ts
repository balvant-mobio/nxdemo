import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[nxdemoHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @Input('nxdemoHighlight') highlightColor = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
