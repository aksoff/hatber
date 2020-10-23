import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { PerformersService } from 'src/app/shared/services/performers.service'

@Component({
  selector: 'app-performers-form',
  templateUrl: './performers-form.component.html',
  styleUrls: ['./performers-form.component.scss']
})
export class PerformersFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private performerService: PerformersService
  ) {}
  performerForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]]
  })
  ngOnInit(): void {}

  onSubmit() {
    this.performerForm.disable()
    console.log(this.performerForm.value)
    this.performerService.create(this.performerForm.value).subscribe(
      (performer) => {
        console.log('success')
        this.router.navigate(['/performers'])
      },
      (error) => {
        console.log(error)
      },
      () => {
        this.performerForm.enable()
      }
    )
  }
}
