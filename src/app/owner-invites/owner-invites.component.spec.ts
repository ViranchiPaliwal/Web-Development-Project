import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerInvitesComponent } from './owner-invites.component';

describe('OwnerInvitesComponent', () => {
  let component: OwnerInvitesComponent;
  let fixture: ComponentFixture<OwnerInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
