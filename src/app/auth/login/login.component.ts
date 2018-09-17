import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
//import { TokenService } from '../../auth/service/token.service';
import { NavBarComponent } from '../../main/nav-bar/nav-bar.component';
//import { AuthService } from '../service/auth.service';
import { GlobalVar } from '../../util/global';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { UtilService } from '../../util/service/util.service';

import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuarioForm = this.fb.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
  });

  error = false;
  constructor(private http: HttpClient, 
    //private authService: AuthService, private tokenService: TokenService,
    private router: Router, private fb: FormBuilder, 
    //private cuPool: CognitoUserPool, private cuAttribute: CognitoUserAttribute, private cu: CognitoUser
    private utilService: UtilService) {

  }

  ngOnInit() { }

  get email() { return this.usuarioForm.get('email'); }
  get password() { return this.usuarioForm.get('password'); }

  login() {
    Object.keys(this.usuarioForm.controls).forEach(field => { // {1}
      const control = this.usuarioForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
    if (this.usuarioForm.valid) {
      this.utilService.loading.next(true);
      var poolData =  { UserPoolId : 'eu-west-1_bG8wMzFAW', ClientId : '1gpm36pbf5c3mfaf2a9q1j6lt5' };
      var userPool = new CognitoUserPool(poolData);
      

/*
      this.authService.login(this.usuarioForm.value.email, this.usuarioForm.value.password,
        function (token) {
          if (token !== null) {
            this.tokenService.create(token);
            this.utilService.loading.next(false);
          }
          this.utilService.loading.next(false);
          this.error = true;
        }.bind(this));
*/
    }
  }

  public subscribeForm = this.fb.group({
    userName: new FormControl('', Validators.required),
  });

  get userName() { return this.subscribeForm.get('userName'); }

  loginMaxPruebas() {
    Object.keys(this.subscribeForm.controls).forEach(field => { // {1}
      const control = this.subscribeForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });

console.log("subscribeForm.value.userName");
console.log(this.subscribeForm.value.userName);

    var poolData =  { UserPoolId : 'eu-west-1_bG8wMzFAW', ClientId : '1gpm36pbf5c3mfaf2a9q1j6lt5' };
    var userPool = new CognitoUserPool(poolData);

    var attributeList = [];
    
    var dataEmail = {
        Name : 'email',
        Value : this.subscribeForm.value.userName
    };

    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : '+345555555555'
    };

    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);    

    userPool.signUp(this.subscribeForm.value.userName, '123456', attributeList, null, function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      var cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      console.log('cognitoUser ' +  JSON.stringify(cognitoUser));
    });

  }

}
