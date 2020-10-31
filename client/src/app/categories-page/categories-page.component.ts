import { Component, OnInit } from '@angular/core'
import { CategoriesService } from '../shared/services/categories.service'
import { Category } from '../shared/services/interfaces'
import { MaterialService } from '../shared/services/material.service'

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories: Category[] = []
  isLoading = true
  constructor(
    private categoriesService: CategoriesService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.categoriesService.fetch().subscribe(
      (categories) => {
        this.isLoading = false
        this.categories = categories
      },
      (error) => {
        this.materialService.openSnackBar(error.message.message)
      },
      () => {
        this.isLoading = false
      }
    )
  }
}
