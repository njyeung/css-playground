import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-privacy-input',
  imports: [],
  templateUrl: './privacy-input.html',
  styleUrl: './privacy-input.css',
})
export class PrivacyInput implements OnInit, OnDestroy {
  @ViewChild('privacyInput') privacyInput!: ElementRef<HTMLInputElement>;

  value:string = ""

  isFocused: boolean = false

  originA: number | null = null; // rotation around z-axis
  originB: number | null = null;  // rotation around x-axis
  originG: number | null = null; // rotation around y-axis

  currA: number | null = null; // rotation around z-axis
  currB: number | null = null;  // rotation around x-axis
  currG: number | null = null; // rotation around y-axis

  prevDist: number | null = null;

  private wrapAngle(diff: number): number {
    return ((diff + 180) % 360 + 360) % 360 - 180;
  }

  private onDeviceOrientation = (event: DeviceOrientationEvent) => {
    this.currA = event.alpha;
    this.currB = event.beta;
    this.currG = event.gamma;

    if (this.isFocused && this.originA != null && this.originB != null && this.originG != null) {
      const da = this.wrapAngle((this.currA ?? 0) - this.originA);
      const db = this.wrapAngle((this.currB ?? 0) - this.originB);
      const dg = this.wrapAngle((this.currG ?? 0) - this.originG);

      const rawDist = Math.sqrt(da * da + db * db + dg * dg);
      var distance
      if (this.prevDist) {
        distance = this.prevDist * 0.7 + rawDist * 0.3
      } else {
        distance = rawDist
      }
      
      this.prevDist = distance

      // first 10 degrees don't do anything
      if (distance < 10) {
        return
      }
      
      // 45 degrees of rotation = fully opaque
      const opacity = Math.min((distance-10) / 35, 1);
      this.privacyInput.nativeElement.style.color = `rgba(0,0,0,${1-opacity})`
      this.privacyInput.nativeElement.style.backgroundColor = `rgba(0,0,0,${opacity})`;
    }
  };

  async onFocus() {
    const DME = DeviceMotionEvent as any;
    if (typeof DME.requestPermission === 'function') {
      const result = await DME.requestPermission();
      if (result !== 'granted') return;
    }
    this.isFocused = true
    this.prevDist = null
    this.originA = this.currA
    this.originB = this.currB
    this.originG = this.currG

    this.privacyInput.nativeElement.value = this.value
  }

  onBlur() {
    this.isFocused = false
    this.originA = null
    this.originB = null
    this.originG = null

    this.privacyInput.nativeElement.style.backgroundColor = `rgba(0,0,0,0)`;
    this.value = this.privacyInput.nativeElement.value

    this.privacyInput.nativeElement.style.color = `rgba(0,0,0,1)`
    this.privacyInput.nativeElement.value = "*".repeat(this.value.length)
  }

  ngOnInit() {
    window.addEventListener('deviceorientation', this.onDeviceOrientation);
  }

  ngOnDestroy() {
    window.removeEventListener('deviceorientation', this.onDeviceOrientation);
  }
}
