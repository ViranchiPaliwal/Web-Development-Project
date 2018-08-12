import {Component, Input, NgZone, OnInit} from '@angular/core';
import {FileUploaderOptions, ParsedResponseHeaders} from "ng2-file-upload";
import {UserServiceClient} from "../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user.model.client";
import {HttpClient} from "@angular/common/http";

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

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.service
      .findUserByUserName(this.username)
      .then(user =>
        this.user = user);
  }
}
