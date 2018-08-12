import {Component, Input, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private service: UserServiceClient, private router: Router) {
  }

  @Input() isLoggedIn: false;
  @Input() isAdmin: false;
  @Input() isOwner: false;
  @Input() isTenant: false;


  ngOnInit() {
  }

  logout() {
    this.service.logout()
      .then(() => this.router.navigate(['login']));
  }

}
