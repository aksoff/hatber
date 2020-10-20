import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../shared/services/auth.service'
import { MaterialService } from '../shared/services/material.service'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnDestroy {
  registerForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  hasUnitNumber = false

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
    this.registerForm.disable()
    this.aSub = this.auth.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      (error) => {
        this.materialService.openSnackBar(error.error.message)
        this.registerForm.enable()
      }
    )
  }
}
