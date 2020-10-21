import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankdialogComponent } from './add-bankdialog.component';

describe('AddBankdialogComponent', () => {
  let component: AddBankdialogComponent;
  let fixture: ComponentFixture<AddBankdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBankdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBankdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
