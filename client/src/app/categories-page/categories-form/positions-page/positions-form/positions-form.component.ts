import { Component, Inject, Input, OnInit } from '@angular/core'
import { FormBuilder, NgForm, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

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

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let obs$
    console.log(this.positionForm.value)

    //obs$ =
  }
}
