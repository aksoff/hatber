import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Performer } from '../shared/services/interfaces'
import { PerformersService } from '../shared/services/performers.service'

@Component({
  selector: 'app-performers-page',
  templateUrl: './performers-page.component.html',
  styleUrls: ['./performers-page.component.scss']
})
export class PerformersPageComponent implements OnInit {
  displayedColumns: string[] = ['Idx', 'name', 'action']
  dataSource: Observable<Performer[]>
  spinner = false
  constructor(private performersService: PerformersService) {}

  ngOnInit(): void {
    this.dataSource = this.performersService.fetch()
    this.spinner = true
  }
}
