import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, filter, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IUser } from '../models/user.model';
import { IComment, IPost } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})

export class ApiRequestService {
  static API_URL = environment.apiUrl

  constructor(private _httpApi: HttpClient) { }

  // TODO gestionar errores

  getUsers(){
    return this._httpApi.get<IUser[]>(`${ApiRequestService.API_URL}/users`).pipe(
      map(response => response),
      catchError(error => {
        return throwError(error)
      })
    )
  }

  getPostByUserId(id: number){
    const params = new HttpParams().set('userId', id.toString())

    return this._httpApi.get<IPost[]>(`${ApiRequestService.API_URL}/posts/`, { params }).pipe(
      filter(response => response.length >= 1),
      map(response => response),
      catchError(error => throwError(error))
    )
  }

  getCommentsByPost(postId: any) {
    const params =new HttpParams().set('postId', postId)
    params.set('postId',postId)

    return this._httpApi.get<IComment[]>(`${ApiRequestService.API_URL}/comments`, { params }).pipe(
      filter(response => response.length >= 1),
      map(comments => comments),
      catchError(error => throwError(error))
    )
  }
}
