import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Performer } from './interfaces'

@Injectable({ providedIn: 'root' })
export class PerformersService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Performer[]> {
    return this.http.get<Performer[]>('/api/performer')
  }

  create(performer: Performer): Observable<Performer> {
    return this.http.post<Performer>('/api/performer', performer)
  }
}
