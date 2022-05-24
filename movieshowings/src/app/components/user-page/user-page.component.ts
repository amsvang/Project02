import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/IUser';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {


  hide:boolean = true;

  constructor(private userService:UserService, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.getCurrentInfo();
  }
  
  ngOnChanges(): void {
    this.getCurrentInfo();
  }

  showFirst?:String = "";
  showLast?:String = "";
  showEmail:String = "";
  showPassword:String = "";

  ticketMovieName:String = "";
  ticketPrice:String = "";

  userInfo:IUser = {
    first:"",
    last:"",
    email:"",
    password:""
  }
  
  showHide(): void {
    this.hide = !this.hide;
  }

  getCurrentInfo(){
    if(!this.cookieService){
      alert("Please login to access this page");
      window.location.href="/login";
    }
    let id = this.cookieService.getCookie("id");
    this.userService.getUser(id)
    .subscribe((data => {
      this.showFirst = data.first;
      this.showLast = data.last;
      this.showEmail = data.email;
      this.showPassword = data.password;
    }));
  }

  getUserFromUpdateUser($event: any):void{
    console.log("called getUserfromUpdateUser");
    console.log($event);

    this.userInfo = $event;


    this.userService.update(this.userInfo)
    .subscribe((data) => {
      if(data == null){
        alert("Error, could not change information.");
      }
      console.log(data);
      
    })

    this.showFirst = this.userInfo.first;
    this.showLast = this.userInfo.last;
    this.showEmail = this.userInfo.email;
    this.showPassword = this.userInfo.password;

  }

}
