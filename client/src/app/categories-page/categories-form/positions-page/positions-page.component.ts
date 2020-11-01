import { Component, OnInit } from '@angular/core'

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
  positions: Position[] = [
    { name: 'Service 1', cost: 300 },
    { name: 'Service 2', cost: 400 },
    { name: 'Service 3', cost: 500 }
  ]

  displayedColumns = ['Idx', 'name', 'cost']
  constructor() {}

  ngOnInit(): void {}
}
