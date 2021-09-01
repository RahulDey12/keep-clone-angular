import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeSwitcherService {
  
  private mode: string|null = null
  private localStorage = window.localStorage
  private modeSubject: Subject<string>;

  constructor() {
    this.modeSubject = new Subject();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ev => {
      if(this.isAuto()) {
        const mode = ev.matches ? "dark" : "light";
        this.setMode(mode, false)
      }
    });
  }

  getMode(fresh: boolean = false): string {
    if(!fresh && this.mode) {
      return this.mode
    }

    const theme = this.localStorage.getItem('theme')
    
    if(theme) {
      this.setMode(theme, false)
      return theme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setMode('dark', false)
      return 'dark';
    }else {
      this.setMode('light', false)
      return 'light';
    }
  }

  setMode(mode: string, updateLocalStorage: boolean = true): string {
    this.mode = mode
    this.modeSubject.next(mode)

    if(updateLocalStorage) {
      this.localStorage.setItem('theme', mode)
    }

    return mode;
  }

  reset(): string {
    this.localStorage.removeItem('theme')
    this.mode = null;
    
    return this.getMode()
  }

  isAuto(): boolean {
    if(this.localStorage.getItem('theme')) {
      return false;
    }

    return true;
  }

  listenChanges() {
    return this.modeSubject
  }
}
