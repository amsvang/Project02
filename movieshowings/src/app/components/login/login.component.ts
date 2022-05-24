import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  error: boolean = false;

  onSubmit(): void {
    console.log(this.email);
    console.log(this.password);


    //connect to userService
    this.userService.login(this.email, this.password)
    .subscribe(data => {
      console.log(data);
      if(data == null){
        alert("Invalid login, please try again");
        this.router.navigate(["/login"]);
      } else {
      document.cookie = `id=` + data.id;
      let email2 = "";
      let password2 = "";

      email2 = data.email;
      password2 = data.password;

      this.userService.user = {
        email: email2,
        password: password2,
        id: data.id
      }
        
    this.userService.user$.next(this.userService.user);
    this.router.navigate(["/main-page"]);
    }

    });
    

  }

  ngOnInit(): void {
  }

  constructor(private userService:UserService, private router: Router){ }


}
