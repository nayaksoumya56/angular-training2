import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userName;
  public userEmail;
  public userPassword;
  public userPhone;
  public userData:any[]=[];

  createNewUser(name, email, password, phone) {
    let userDetails = {
      userName: name,
      userEmail: email,
      userPassword: password,
      userPhone: phone
    }

    this.userData.push(userDetails);
    return true;
  }

  fetchUserData() {
    return this.userData[0].userName;
  }
  //private userName = new Subject<string>();
  // private userEmail = new Subject<string>();
  // private userPassword = new Subject<string>();
  // private userPhone = new Subject<string>();


  constructor() {
  }

  // getUserName$ = this.userName.asObservable();
  // getUserEmail$ = this.userEmail.asObservable();
  // getUserPassword$ = this.userPassword.asObservable();
  // getUserPhone$ = this.userPhone.asObservable();

  // getuserName(){ return this.userName; }
  // setuserName(name:string){ this.userName = name; }
  // getuserEmail(){ return this.userEmail; }
  // setuserEmail(email:string){ this.userEmail = name; }
  // getuserPassword(){ return this.userPassword;} 
  // setuserPassword(name:string){ this.userPassword = name; }
  // getuserPhone(){ return this.userPhone; }
  // setuserPhone( name:string){this.userPhone = name; }

}
