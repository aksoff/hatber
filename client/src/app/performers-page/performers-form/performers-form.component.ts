import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Performer, Message } from 'src/app/shared/services/interfaces'
import { MaterialService } from 'src/app/shared/services/material.service'
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
    private route: ActivatedRoute,
    private materialService: MaterialService,
    private performerService: PerformersService
  ) {}
  performerForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]]
  })

  performer: Performer
  isNew = true
  isLoading = true

  ngOnInit(): void {
    this.performerForm.disable()
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.performerService.getById(params['id'])
          }
          return of(null)
        })
      )
      .subscribe(
        (performer: Performer) => {
          if (performer) {
            this.performer = performer
            this.performerForm.patchValue({ name: performer.name })
          }
          this.performerForm.enable()
        },
        (error) => this.materialService.openSnackBar(error.error.message)
      )
  }

  onSubmit() {
    let obs$
    this.performerForm.disable()
    if (this.isNew) {
      // Create
      obs$ = this.performerService.create(this.performerForm.value).subscribe(
        (performer) => {
          this.router.navigate(['/performers'])
        },
        (error) => {
          console.log(error)
        },
        () => {
          this.performerForm.enable()
        }
      )
    } else {
      // Update
      obs$ = this.performerService.update(
        this.performer._id,
        this.performerForm.value
      )
      obs$.subscribe(
        (performer) => {
          this.performer = performer
          this.materialService.openSnackBar('Изменения сохранены')
        },
        (error) => {
          this.materialService.openSnackBar(error.error.message)
          this.performerForm.enable()
        },
        () => {
          this.performerForm.enable()
          this.router.navigate(['/performers'])
        }
      )
    }
  }

  delete() {
    const decision = window.confirm(
      `Вы действительно хотите удалить сотрудника "${this.performer.name}"?`
    )

    if (decision) {
      this.performerService.delete(this.performer._id).subscribe(
        (res) => this.materialService.openSnackBar(res.message),
        (error) => this.materialService.openSnackBar(error.error.message),
        () => this.router.navigate(['/performers'])
      )
    }
  }
}
