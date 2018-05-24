import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../model/credentials';
import { LoginService } from '../../service/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService) {}

  login(): void {
    this.loginService.loginWithCredentials(this.credentials as Credentials).subscribe(resp => {
        console.log(resp);
      });;
  }

  ngOnInit() {
  }

}
