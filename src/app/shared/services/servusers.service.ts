import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class ServusersService {
  private urlAPI: string = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  private processError(error: HttpErrorResponse) {
    let message = "";
    if (error.status === 404) {
      message = "Page does not exist";
    } else {
      message = "An error occurred";
    }
    const err = new Error(message);
    return throwError(() => err);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlAPI)
      .pipe(
        catchError(this.processError)
      );
  }

  getUserById(id: number): any {
    return this.http.get(`${this.urlAPI}/?id=${id}`)
      .pipe(
        catchError(this.processError)
      );
  }

  updateUserInfo(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlAPI}/${user.id}/`, user)
      .pipe(
        catchError(this.processError)
      )
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlAPI, user)
      .pipe(
        catchError(this.processError)
      )
  }

  updateUserIsActive(id: number, isActive: boolean): Observable<User> {
    return this.http.patch<User>(`${this.urlAPI}/${id}/`, { isActive: isActive })
      .pipe(
        catchError(this.processError)
      )
  }

  getWishlistItems(id: number): Observable<number[]> {
    return this.http.get<User[]>(`${this.urlAPI}/?id=${id}`)
      .pipe(
        map(users => {
          if (users.length === 0) {
            throw new Error(`User with id ${id} not found.`);
          }
          return users[0].wishlist;
        }),
        catchError(this.processError)
      );
  }

  updateWishlist(id: number, wishlist: number[]): Observable<User> {
    return this.http.patch<User>(`${this.urlAPI}/${id}/`, { wishlist: wishlist })
    .pipe(
      catchError(this.processError)
    );
  }
}