import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyInput } from './privacy-input';

describe('PrivacyInput', () => {
  let component: PrivacyInput;
  let fixture: ComponentFixture<PrivacyInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
