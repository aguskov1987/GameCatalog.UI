import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgReactDirective } from './directives/ng-react.directive';
import Footer from './react/footer-react';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgReactDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'game-catalog-ui';
  public footer = Footer;
}
