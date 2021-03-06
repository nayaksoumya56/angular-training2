import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  welcomeMessage='';

  constructor(private userService: UserService) {
    try {
      this.welcomeMessage = (this.userService.fetchUserData());
    } catch (error) {
      console.log(error);
    }

  }

  ngOnInit() {
  }

  // fetchUserName(){
  //   this.welcomeMessage = (this.userService.fetchUserData());
  // }
}
