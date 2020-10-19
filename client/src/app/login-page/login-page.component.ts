import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../shared/services/auth.service'
import { MaterialService } from '../shared/services/material.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(5)]]
  })

  aSub: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private materialService: MaterialService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Теперь Вы можете зайти в систему? используя свои данные
      } else if (params['accessDenied']) {
        // Сначала необходимо авторизоваться
      }
    })
  }

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
        console.log('login success')
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
