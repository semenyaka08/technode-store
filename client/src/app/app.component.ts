import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './layouts/header/header.component';
import {HomeComponent} from './features/home/home.component';
import {OverlayService} from './core/services/overlay.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TechNode.Ua';
  overlayService = inject(OverlayService);
}
