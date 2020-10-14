import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('submit login..')
  }

}
