import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  displayOverlay = signal<boolean>(false)
}
