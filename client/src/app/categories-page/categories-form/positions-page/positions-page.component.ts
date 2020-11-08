import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTable } from '@angular/material/table'
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
  @ViewChild(MatTable) table: MatTable<any>

  positions: Position[] = []
  displayedColumns = ['Idx', 'name', 'cost', 'action']
  isLoading = true
  constructor(
    public positionsForm: MatDialog,
    private positionsService: PositionsService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.positionsService.fetch(this.categoryId).subscribe(
      (positions) => {
        this.positions = positions
        this.isLoading = false
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

  openForUpdate(position: Position) {
    const formRef = this.positionsForm.open(PositionsFormComponent, {
      data: { categoryId: this.categoryId, position }
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

  remove(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(
      `Вы действительно хотите удалить ${position.name} ?`
    )

    if (decision) {
      this.positionsService.delete(position._id).subscribe(
        (res) => {
          const idx = this.positions.findIndex((p) => p._id === position._id)
          this.positions.splice(idx, 1)
          console.log(this.positions)
          this.table.renderRows()
          this.materialService.openSnackBar(res.message)
        },
        (error) => this.materialService.openSnackBar(error.error.message)
      )
    }
  }
}
