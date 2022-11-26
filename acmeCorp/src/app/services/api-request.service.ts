import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IUser } from '../models/user.model';

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
}
