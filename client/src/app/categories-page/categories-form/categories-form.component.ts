import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { CategoriesService } from 'src/app/shared/services/categories.service'
import { Category } from 'src/app/shared/services/interfaces'
import { MaterialService } from 'src/app/shared/services/material.service'

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  categoryForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]]
  })

  category: Category
  isNew = true
  isLoading = true

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private materialService: MaterialService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryForm.disable()
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.categoryService.getById(params['id'])
          }
          return of(null)
        })
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.category = category
            this.categoryForm.patchValue({ name: category.name })
          }
          this.isLoading = false
          this.categoryForm.enable()
        },
        (error) => this.materialService.openSnackBar(error.error.message)
      )
  }

  onSubmit() {
    let obs$
    this.categoryForm.disable()
    if (this.isNew) {
      // Create
      obs$ = this.categoryService.create(this.categoryForm.value).subscribe(
        (performer) => {
          this.router.navigate(['/categories'])
        },
        (error) => {
          console.log(error)
        },
        () => {
          this.categoryForm.enable()
        }
      )
    } else {
      // Update
      obs$ = this.categoryService.update(
        this.category._id,
        this.categoryForm.value
      )
      obs$.subscribe(
        (category) => {
          this.category = category
          this.materialService.openSnackBar('Изменения сохранены')
        },
        (error) => {
          this.materialService.openSnackBar(error.error.message)
          this.categoryForm.enable()
        },
        () => {
          this.categoryForm.enable()
          this.router.navigate(['/categories'])
        }
      )
    }
  }

  delete() {
    const decision = window.confirm(
      `Вы действительно хотите удалить категорию "${this.category.name}"?`
    )

    if (decision) {
      this.categoryService.delete(this.category._id).subscribe(
        (res) => this.materialService.openSnackBar(res.message),
        (error) => this.materialService.openSnackBar(error.error.message),
        () => this.router.navigate(['/categories'])
      )
    }
  }
}
