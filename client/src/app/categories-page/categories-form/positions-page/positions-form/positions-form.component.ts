import { Component, Inject, Input, OnInit } from '@angular/core'
import { FormBuilder, NgForm, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Position } from 'src/app/shared/services/interfaces'
import { PositionsService } from 'src/app/shared/services/positions.service'

export interface DialogData {
  categoryId: string
}

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit {
  positionForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    cost: [null]
  })

  position: Position

  constructor(
    private formBuilder: FormBuilder,
    private positionsService: PositionsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let obs$
    this.position = {
      name: this.positionForm.get('name').value,
      cost: this.positionForm.get('cost').value,
      category: this.data.categoryId
    }

    obs$ = this.positionsService.create(this.position).subscribe(
      (position) => {
        console.log(position)
      },
      (error) => {
        console.log(error)
      },
      () => {
        this.positionForm.enable()
      }
    )
  }
}
