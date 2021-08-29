import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/userdetails';
import { CourseService } from 'src/app/services/course.service';

import  *  as  data  from  '../../../../login-data.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  activeUser = new UserDetails;
  ispresent: Boolean;

  username = new FormControl('');
  password = new FormControl('');

  constructor(private service :CourseService, public router:Router) { }

  ngOnInit(): void {
    // username = new FormControl('', [Validators.required]);
    // password = new FormControl('', [Validators.required]);
  }

  onLogin(){

    let userDetails = data.users;
    let isLoggedIn = false;

    for (var d in userDetails){

      if( userDetails[d].user === this.username.value 
        && userDetails[d].password === this.password.value ){
          
          this.ispresent = true;
          this.activeUser.username = this.username.value;
          this.activeUser.password = this.password.value;

          isLoggedIn = true;
          break;
      }
    }

    if(!isLoggedIn){
      this.loginForm.reset();
      alert("invalid credentials");
    }
    else{
      localStorage.setItem('username', this.activeUser.username);
      localStorage.setItem('password', this.activeUser.password);

      console.log(localStorage.getItem('username'));
      console.log(localStorage.getItem('password'));

    }

  }

}
