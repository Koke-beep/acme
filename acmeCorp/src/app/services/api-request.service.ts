import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { IUser } from '../models/user.model';
import { IComment, IPost } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})

export class ApiRequestService {
  static API_URL = environment.apiUrl
  backupUsers: IUser[] = []

  constructor(private _httpApi: HttpClient) { }

  // TODO handle errors

  getUsers(){
    return this._httpApi.get<IUser[]>(`${ApiRequestService.API_URL}/users`).pipe(
      map(response => {
        this.backupUsers = [...response]
        return response.slice(0, 3)
      }),
      catchError(error => {
        return throwError(error)
      })
    )
  }

  getMoreUsers(index: number){
    return of(this.backupUsers.slice(index, index + 3))
  }

  getPostByUserId(id: number) {
    const params = new HttpParams().set('userId', id.toString())

    return this._httpApi.get<IPost[]>(`${ApiRequestService.API_URL}/posts/`, { params }).pipe(
      map(response => response),
      catchError(error => throwError(error))
    )
  }

  getCommentsByPost(postId: any) {
    const params = new HttpParams().set('postId', postId)

    return this._httpApi.get<IComment[]>(`${ApiRequestService.API_URL}/comments`, { params }).pipe(
      map(comments => comments),
      catchError(error => throwError(error))
    )
  }
}
