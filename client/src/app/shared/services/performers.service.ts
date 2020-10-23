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

  getById(id: string): Observable<Performer> {
    return this.http.get<Performer>(`/api/performer/${id}`)
  }

  create(performer: Performer): Observable<Performer> {
    return this.http.post<Performer>('/api/performer', performer)
  }

  update(id: string, name: string): Observable<Performer> {
    const data = new FormData()
    data.append('name', name)
    console.log(data, ' - data')

    return this.http.patch<Performer>(`/api/performer/${id}`, data)
  }
}
