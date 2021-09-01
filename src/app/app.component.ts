import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { DarkModeSwitcherService } from './dark-mode-switcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private currentColorScheme = '';

  constructor(
    private renderer: Renderer2,
    private modeSwitcher: DarkModeSwitcherService
  ) {}

  ngOnInit() {
    this.updateColorScheme(this.modeSwitcher.getMode())
    this.modeSwitcher.listenChanges().subscribe(colorScheme => {
      this.updateColorScheme(colorScheme)
    })
  }

  private updateColorScheme(colorScheme: string) {
    if(this.currentColorScheme.length > 0) {
      this.renderer.removeClass(document.documentElement, this.currentColorScheme)
    }

    this.renderer.addClass(document.documentElement, colorScheme)
    this.currentColorScheme = colorScheme
  }
}
