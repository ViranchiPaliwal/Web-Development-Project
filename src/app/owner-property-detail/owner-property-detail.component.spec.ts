import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPropertyDetailComponent } from './owner-property-detail.component';

describe('OwnerPropertyDetailComponent', () => {
  let component: OwnerPropertyDetailComponent;
  let fixture: ComponentFixture<OwnerPropertyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerPropertyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerPropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
