import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Property} from "../models/property.model.client";
import {Invite} from "../models/invite.model.client";
import {PropertyServiceClient} from "../services/property.service.client";
import {InviteServiceClient} from "../services/invite.service.client";

@Component({
  selector: 'app-owner-property-detail',
  templateUrl: './owner-property-detail.component.html',
  styleUrls: ['./owner-property-detail.component.css']
})
export class OwnerPropertyDetailComponent implements OnInit {

  constructor(private service: PropertyServiceClient,
              private inviteService: InviteServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.propertyId = params['propertyId']);
  }

  property: Property = new Property()
  propertyId
  invites: Invite[]

  ngOnInit() {
    this.service.findPropertyById(this.propertyId)
      .then((property) => this.property = property);
    this.getInterestedTenant(this.propertyId)
  }

 getInterestedTenant(propertyId){
    this.inviteService.findInvitationByPropertyId(propertyId)
      .then((invites) => {
          this.invites = invites
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
