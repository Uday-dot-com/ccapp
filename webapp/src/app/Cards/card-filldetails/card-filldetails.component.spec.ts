import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFilldetailsComponent } from './card-filldetails.component';

describe('CardFilldetailsComponent', () => {
  let component: CardFilldetailsComponent;
  let fixture: ComponentFixture<CardFilldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFilldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFilldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
