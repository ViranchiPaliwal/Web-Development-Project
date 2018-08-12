import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantWishlistComponent } from './tenant-wishlist.component';

describe('TenantWishlistComponent', () => {
  let component: TenantWishlistComponent;
  let fixture: ComponentFixture<TenantWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
