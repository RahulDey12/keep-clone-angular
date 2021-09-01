import { Component, OnInit } from '@angular/core';
import { DarkModeSwitcherService } from 'src/app/dark-mode-switcher.service';

@Component({
  selector: 'app-color-mode',
  templateUrl: './color-mode.component.html',
  styleUrls: ['./color-mode.component.scss']
})
export class ColorModeComponent {
  
  constructor(
    public modeSwitcher: DarkModeSwitcherService
  ) { }

  handleClick() {
    if(this.modeSwitcher.isAuto()) {
      this.modeSwitcher.setMode('light')
    }else if(this.modeSwitcher.getMode() == 'light') {
      this.modeSwitcher.setMode('dark')
    } else if(this.modeSwitcher.getMode() == 'dark') {
      this.modeSwitcher.reset()
    }
  }

}
