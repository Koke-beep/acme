import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IState } from '../models/state.model';
import { IUser } from '../models/user.model';
import { filter, map, take } from 'rxjs/operators'
import { ApiRequestService } from '../services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _state: BehaviorSubject<IState> = new BehaviorSubject<IState>({
    users: [],
    userSelected: {
      posts: []
    },
    loading: false,
    error: null
  })

  public readonly $users!: Observable<IUser[]>

  constructor(private _apiRequest: ApiRequestService) {
    this.$users = this._state.pipe(
      filter(({users}) => users.length > 0),
      map(({users}) => users)
    )
  }

  getUsers(){
    this._apiRequest.getUsers().pipe(
      map(response =>{
        this._state.next({...this._state.value, users: [...response]})}
        ),
      take(1)
    ).subscribe()
  }
}
