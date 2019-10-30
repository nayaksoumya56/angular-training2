import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  create=false;
  
  constructor(private userService: UserService, private router: Router) {   }

  ngOnInit() {  }

  registerUser(name,email,password,mobile){
    this.create = this.userService.createNewUser(name,email,password,mobile);
    if (this.create){
      this.router.navigate(['/dashboard/'+(name)]);
    }
  }

  
  
}
