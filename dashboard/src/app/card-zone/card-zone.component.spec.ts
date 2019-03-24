import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardZoneComponent } from './card-zone.component';

describe('CardZoneComponent', () => {
  let component: CardZoneComponent;
  let fixture: ComponentFixture<CardZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
