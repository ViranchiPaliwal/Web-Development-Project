import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Property} from "../models/property.model.client";
import {PropertyServiceClient} from "../services/property.service.client";
import {InviteServiceClient} from "../services/invite.service.client";
import {Invite} from "../models/invite.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {USER_ROLE} from "../enums/userRole";

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  constructor(private service: PropertyServiceClient,
              private userService: UserServiceClient,
              private inviteService: InviteServiceClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(
      params => this.propertyId = params['propertyId']);
  }

  property
  propertyId
  invite: Invite = new Invite()
  isInterested
  user
  isOwner = false
  invites: Invite[]
  isLoggedIn = false
  isAnonymous
  isTenant = false
  role = USER_ROLE

  ngOnInit() {
    this.userService.profile()
      .then(user => {
        if (!user.invalid && user.role!=='Admin') {
          this.user = user;
          this.isLoggedIn = true
          this.service.findPropertyById(this.propertyId)
            .then((property) => this.property = property)
            .then(() =>{
              if (this.user.role === 'Owner') {
                this.isOwner = true
                this.isTenant = false
                this.getInterestedTenant(this.propertyId)
              }
              else{
                this.isOwner = false
                this.isTenant = true
                this.getInviteStatus(this.propertyId)
              }
            })
        } else {
          alert('Invalid user or your session has expired or unauthorized access. Kindly login.');
          this.router.navigate(['login']);
        }
      })
  }

  getInterestedTenant(propertyId){
    this.inviteService.findInvitationByPropertyId(propertyId)
      .then((invites) => {
        this.invites = invites
      })
  }

  getInviteStatus(propertyId) {
    this.inviteService.findInvitationByCredentials(propertyId)
      .then((invite) => {
          if (invite.invalid) {
            this.isInterested = false;
          }
          else {
            this.isInterested = true;
            this.invite = invite
          }
        }
      )
  }

  removeFromInvite(propertyId){
    this.inviteService.removeFromInvitation(propertyId).then(() => {
      this.getInviteStatus(propertyId)
    });
  }

  addToInvite(propertyId){
    this.inviteService.addToInvitation(propertyId)
      .then(() => {
        this.getInviteStatus(propertyId)
      })
  }

  AcceptInvitation(tenantId){
    var invite = {
      user: tenantId,
      property: this.propertyId,
      status: "Accept"
    }
    this.inviteService.updateInvitationStatus(invite)
      .then(() => this.getInterestedTenant(this.propertyId));
  }

  RejectInvitation(tenantId){
    var invite = {
      user: tenantId,
      property: this.propertyId,
      status: "Reject"
    }
    this.inviteService.updateInvitationStatus(invite)
      .then(() => this.getInterestedTenant(this.propertyId));
  }

}
