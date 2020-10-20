import { Injectable } from '@angular/core'
import { User } from './interfaces'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null
  constructor(private http: HttpClient) {}

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token)
        this.setToken(token)
        console.log(token, '-login')
      })
    )
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    console.log(localStorage.getItem('auth-token'), ' -getToken')
    return localStorage.getItem('auth-token')
    //return this.token
  }

  isAuthenticated(): boolean {
    console.log(!!this.token, ' isAuth..')

    //return !!this.token
    return !!localStorage.getItem('auth-token')
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}
