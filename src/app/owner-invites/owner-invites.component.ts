import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";
import {USER_ROLE} from "../enums/userRole";
import {ActivatedRoute, Router} from "@angular/router";
import {InviteServiceClient} from "../services/invite.service.client";

@Component({
  selector: 'app-owner-invites',
  templateUrl: './owner-invites.component.html',
  styleUrls: ['./owner-invites.component.css']
})
export class OwnerInvitesComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private inviteService: InviteServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.userId = params['userId']);
  }
  isLoggedIn = false
  isTenant = false
  isOwner = false
  role = USER_ROLE
  invites
  userId
  filteredInvites
  isInvitesEmpty = false
  ngOnInit() {
    this.userService.profile()
      .then(user => {
        if (!user.invalid&&user.role!=this.role.Tenant) {
          this.isLoggedIn = true;
          if(user.role===this.role.Owner){
            this.isOwner = true;
            if(this.userId=='self'){
              this.userId = user._id
            }
          }
          this.getAllInvites();
        } else {
          alert('Invalid user or your session has expired. Kindly login.');
          this.router.navigate(['login']);
        }
      });
  }

  accept(invite){
    var inviter = {
      user: invite.user._id,
      property: invite.property._id,
      status: "Accept"
    }
    this.inviteService.updateInvitationStatus(inviter)
      .then(() => this.getAllInvites());
  }

  reject(invite){
    var inviter = {
      user: invite.user._id,
      property: invite.property._id,
      status: "Reject"
    }
    this.inviteService.updateInvitationStatus(inviter)
      .then(() => this.getAllInvites());
  }

  getAllInvites(){
    this.inviteService.findAllInvites()
      .then( (invites) => {
          this.invites = invites;
          this.filteredInvites = []
          for (var index in this.invites) {
            if (this.invites[index].property.owner == this.userId && this.invites[index].status=='Pending') {
              this.filteredInvites.push(this.invites[index])
            }
          }
          if (this.filteredInvites.length == 0) {
            this.isInvitesEmpty = true
          }
          else {
            this.isInvitesEmpty = false
          }
        }
      )
  }

}
