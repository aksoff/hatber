import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Position } from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Position[]> {
    return this.http.get<Position[]>('/api/position')
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position)
  }
}
