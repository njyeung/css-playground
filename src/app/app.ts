import { Component } from '@angular/core';
import { Toast } from './toast/toast';
import { PrivacyInput } from "./privacy-input/privacy-input";

@Component({
  selector: 'app-root',
  imports: [Toast, PrivacyInput],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showToast = false;

  triggerToast() {
    this.showToast = false;
    // Brief timeout to unmount then remount, so animations replay
    setTimeout(() => this.showToast = true, 10);
  }
}
