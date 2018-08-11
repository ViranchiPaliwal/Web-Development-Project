import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Property} from "../models/property.model.client";
import {PropertyServiceClient} from "../services/property.service.client";
import {InviteServiceClient} from "../services/invite.service.client";
import {Invite} from "../models/invite.model.client";

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  constructor(private service: PropertyServiceClient,
              private inviteService: InviteServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.propertyId = params['propertyId']);
  }

  property: Property = new Property()
  propertyId
  invite: Invite = new Invite()
  isInterested

  ngOnInit() {
    this.service.findPropertyById(this.propertyId)
      .then((property) => this.property = property);
    this.getInviteStatus(this.propertyId)
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
    this.inviteService.removeFromInvitation(propertyId);
  }

  addToInvite(propertyId){
    this.inviteService.addToInvitation(propertyId)
      .then(() => {
        this.getInviteStatus(propertyId)
      })
  }

}
