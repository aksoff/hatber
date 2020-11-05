import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PositionsService } from 'src/app/shared/services/positions.service'
import { PositionsFormComponent } from './positions-form/positions-form.component'

export interface Position {
  name: string
  cost: number
}

@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.scss']
})
export class PositionsPageComponent implements OnInit {
  @Input('categoryId') categoryId: string
  positions: Position[] = []

  displayedColumns = ['Idx', 'name', 'cost']
  constructor(
    public positionsForm: MatDialog,
    private positionsService: PositionsService
  ) {}

  ngOnInit(): void {
    this.positionsService.fetch(this.categoryId).subscribe(
      (positions) => {
        this.positions = positions
      },
      (error) => {
        console.log(error)
      }
    )
  }

  openForm() {
    const formRef = this.positionsForm.open(PositionsFormComponent, {
      data: { categoryId: this.categoryId }
    })
    formRef.afterClosed().subscribe((result) => {
      if (result != 'cancel') {
        this.positionsService.fetch(this.categoryId).subscribe(
          (positions) => {
            this.positions = positions
          },
          (error) => {
            console.log(error)
          }
        )
      } else {
        console.log('cancel dialog')
      }
    })
  }
}
