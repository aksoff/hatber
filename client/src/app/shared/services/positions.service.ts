import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Message, Position } from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(private http: HttpClient) {}

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position)
  }

  delete(id): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${id}`)
  }
}
