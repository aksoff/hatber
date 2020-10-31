import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Category, Message } from './interfaces'

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category')
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>('/api/category', category)
  }

  update(id: string, category: Category): Observable<Category> {
    return this.http.patch<Category>(`/api/category/${id}`, category)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`)
  }
}
