import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRole: string;

  private apiUrl = 'http://localhost:8085/api/user';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(map(response => {
        if (response.message === 'Login successful') {
          this.userRole = response.role;
          return true;
        } else {
          return false;
        }
      }));
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/logout`, { withCredentials: true }).pipe(
      map(() => {
        this.userRole = null;
      })
    );
  }

  getRole(): string {
    return this.userRole;
  }

  isAuthenticated(): boolean {
    return !!this.userRole;
  }
}
