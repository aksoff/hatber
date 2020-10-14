import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}