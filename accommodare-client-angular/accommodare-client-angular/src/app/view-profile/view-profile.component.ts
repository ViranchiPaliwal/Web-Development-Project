import {Component, Input, NgZone, OnInit} from '@angular/core';
import {FileUploaderOptions, ParsedResponseHeaders} from "ng2-file-upload";
import {UserServiceClient} from "../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user.model.client";
import {HttpClient} from "@angular/common/http";
import {USER_ROLE} from "../enums/userRole";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  private title: string;
  constructor(private service: UserServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.username = params['username']);
  }

  username
  user: User = new User();
  isLoggedIn = false;
  isAdmin = false;
  isAnonymous
  isTenant = false
  isOwner = false
  role = USER_ROLE
  ngOnInit() {
    this.service.profile()
      .then(user => {
        if (!user.invalid&&user.role!=this.role.Admin) {
          this.user = user;
          this.isLoggedIn = true;
          if(user.role===this.role.Tenant){
            this.isTenant = true;
          }
          else{
            this.isOwner = true;
          }
        } else {
          alert('Invalid user or your session has expired. Kindly login.');
          this.router.navigate(['login']);
        }
      });
    this.getProfile()
  }

  getProfile() {
    this.service
      .findUserByUserName(this.username)
      .then(user =>
        this.user = user);
  }
}
