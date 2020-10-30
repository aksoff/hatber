import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Performer } from '../shared/services/interfaces'
import { PerformersService } from '../shared/services/performers.service'

@Component({
  selector: 'app-performers-page',
  templateUrl: './performers-page.component.html',
  styleUrls: ['./performers-page.component.scss']
})
export class PerformersPageComponent implements OnInit {
  displayedColumns: string[] = ['Idx', 'name', 'action']
  dataSource: Performer[]
  spinner = true
  constructor(private performersService: PerformersService) {}

  ngOnInit(): void {
    // this.dataSource = this.performersService.fetch()
    // this.spinner = true

    this.performersService.fetch().subscribe(
      (data) => {
        this.spinner = false
        this.dataSource = data
      },
      (error) => (this.spinner = false)
    )
  }
}
