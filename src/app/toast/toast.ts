import { Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  visible = input(false);

  state = signal<'hidden' | 'entering' | 'exiting'>('hidden');

  private exitTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      if (this.visible()) {
        this.enter();
      }
    });
  }

  private enter() {
    if (this.exitTimer) clearTimeout(this.exitTimer);
    this.state.set('entering');

    // Auto-dismiss after 4 seconds
    this.exitTimer = setTimeout(() => this.exit(), 4000);
  }

  private exit() {
    this.state.set('exiting');

    // Unmount after exit animations finish (~3s)
    setTimeout(() => this.state.set('hidden'), 3000);
  }
}
