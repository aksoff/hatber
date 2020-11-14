import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Message, Order } from './interfaces'

Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders')
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`/api/orders/`, order)
  }

  updateOrder() {}

  removeOrder(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/orders/${id}`)
  }
}
