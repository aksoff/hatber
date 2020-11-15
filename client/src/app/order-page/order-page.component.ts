import { Component, OnInit } from '@angular/core'
import { CategoriesService } from '../shared/services/categories.service'
import { Category } from '../shared/services/interfaces'

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  categories: Category[] = []
  isLoading = true
  constructor(public categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.fetch().subscribe(
      (categories) => {
        this.isLoading = false
        this.categories = categories
      },
      (error) => console.log(error),
      () => {
        this.isLoading = false
      }
    )
  }

  selectCategory(id: string) {
    console.log('select Category ', id)
  }
}
