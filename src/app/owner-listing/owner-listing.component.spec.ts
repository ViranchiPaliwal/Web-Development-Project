import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerListingComponent } from './owner-listing.component';

describe('OwnerListingComponent', () => {
  let component: OwnerListingComponent;
  let fixture: ComponentFixture<OwnerListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
