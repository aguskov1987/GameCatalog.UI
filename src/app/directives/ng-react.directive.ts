import { Directive, ElementRef, inject, Input } from '@angular/core';
import { ComponentProps, createElement, ElementType } from 'react';
import { createRoot } from 'react-dom/client';

@Directive({
  selector: '[ngReact]',
  standalone: true
})
export class NgReactDirective<Component extends ElementType> {
  @Input() reactComponent!: Component;
  @Input() props!: ComponentProps<Component>;

  private root = createRoot(inject(ElementRef).nativeElement)

  ngOnChanges() {

    this.root.render(createElement(this.reactComponent, this.props))
  }

  ngOnDestroy() {
    this.root.unmount();
  }
}