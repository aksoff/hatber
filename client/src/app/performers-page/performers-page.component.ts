import { Component, OnInit } from '@angular/core'

export interface Performer {
  name: string
  symbol: string
}

const PERFORMER_DATA: Performer[] = [
  { name: 'Bilichenko', symbol: 'B' },
  { name: 'Shcherbakov', symbol: 'S' },
  { name: 'Popoff', symbol: 'P' }
]

@Component({
  selector: 'app-performers-page',
  templateUrl: './performers-page.component.html',
  styleUrls: ['./performers-page.component.scss']
})
export class PerformersPageComponent implements OnInit {
  displayedColumns: string[] = ['Idx', 'name', 'symbol', 'action']
  dataSource = PERFORMER_DATA

  constructor() {}

  ngOnInit(): void {}
}
