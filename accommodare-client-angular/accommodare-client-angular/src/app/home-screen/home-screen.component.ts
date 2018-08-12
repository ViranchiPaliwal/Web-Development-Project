import {Component, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {Router} from "@angular/router";
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {USER_ROLE} from "../enums/userRole";
import {HttpClient} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private router: Router,
              private _http: HttpClient) {

  }
  images: Array<string>;

  private _randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }

  role = USER_ROLE
  user: User = new User();
  isLoggedIn = false;

  ngOnInit() {
    this._http.get('https://picsum.photos/list')
      .pipe(map((images: Array<{id: number}>) => this._randomImageUrls(images)))
      .subscribe(images => this.images = images);
    this.userService.profile()
      .then(user => {
        if (!user.invalid) {
          this.user = user;
        } else {
          alert('Invalid user or your session has expired. Kindly login.');
          this.router.navigate(['login']);
        }
      });
  }
}
