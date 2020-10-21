import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebankdialogComponent } from './updatebankdialog.component';

describe('UpdatebankdialogComponent', () => {
  let component: UpdatebankdialogComponent;
  let fixture: ComponentFixture<UpdatebankdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatebankdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebankdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
