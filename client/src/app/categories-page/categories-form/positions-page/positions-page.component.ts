import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Position } from 'src/app/shared/services/interfaces'
import { MaterialService } from 'src/app/shared/services/material.service'
import { PositionsService } from 'src/app/shared/services/positions.service'
import { PositionsFormComponent } from './positions-form/positions-form.component'

@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.scss']
})
export class PositionsPageComponent implements OnInit {
  @Input('categoryId') categoryId: string
  positions: Position[] = []

  displayedColumns = ['Idx', 'name', 'cost', 'action']
  constructor(
    public positionsForm: MatDialog,
    private positionsService: PositionsService,
    private materialService: MaterialService
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

  remove(id) {
    const decision = window.confirm(`Вы действительно хотите удалить позицию ?`)

    if (decision) {
      this.positionsService.delete(id).subscribe(
        (res) => {
          const idx = this.positions.findIndex((p) => p._id == id)
          this.positions.slice(idx, 1)
          console.log(this.positions)

          this.materialService.openSnackBar(res.message)
        },
        (error) => this.materialService.openSnackBar(error.error.message)
        //() => this.router.navigate(['/categories'])
      )
    }
  }
}
