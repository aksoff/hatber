import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../shared/services/auth.service'
import { MaterialService } from '../shared/services/material.service'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {
  loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(5)]]
  })

  aSub: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private materialService: MaterialService
  ) {}

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.loginForm.disable()
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.aSub = this.auth.login(user).subscribe(
      () => {
        console.log('success')
        this.router.navigate(['/overview'])
        this.loginForm.enable()
      },
      (error) => {
        this.materialService.openSnackBar(error.error.message)
        console.warn(error)
        this.loginForm.enable()
      }
    )
  }
}
