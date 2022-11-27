import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IComment, IPost, IState, IUserCollection } from '../models/state.model';
import { map, take, distinctUntilChanged } from 'rxjs/operators'
import { ApiRequestService } from '../services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  //TODO Improve state: comments and posts should be a Map object. Makes the card component more reusable.
  private _state: BehaviorSubject<IState> = new BehaviorSubject<IState>({
    users: new Map(),
    idUserSelected: undefined,
    currentComments: [],
    loading: false,
    error: null
  })

  public readonly $users!: Observable<{users: IUserCollection, idUserSelected: number}>
  public readonly $idUserSelected!: Observable<number>

  constructor(private _apiRequest: ApiRequestService) {
    this.$users = this._state.pipe(
      map(state => {
        return {
          users: state.users,
          idUserSelected: state.idUserSelected as number}
      }),
      distinctUntilChanged()
    )
  }

  getUsers() {
    this._apiRequest.getUsers().pipe(
      map(response => {
        const users = new Map()
        response.forEach(user => {
          users.set(user.id, user)
        })

        this._state.next({...this._state.value, users})}
        ),
      take(1)
    ).subscribe()
  }

  getPostsUser(userId: number) {
    const postLoaded = this._state.value.users.get(userId)?.posts
    // Load posts when postLoaded is false (doesn't exist)
     if(typeof postLoaded === 'undefined' || !postLoaded.length){
      console.log("LOADING POSTS...")

      this._apiRequest.getPostByUserId(userId).pipe(
        map(response => {
          const usersUpdated = this.unifyPostsByUser(response)
          this._state.next({...this._state.value, users: usersUpdated, idUserSelected: userId })
        }),
        take(1)
      ).subscribe()
    }else {
    // Change userSelected when post is loaded before
      this._state.next({...this._state.value, idUserSelected: userId})
    }
  }

  getPostComments({ postId, userId }: {[key: string]: number}) {
    // Same functionallity like getPostUser function, only load data if entity don't have info (comments)
    const postWithComments = this.checkIfPostHasComments(postId, userId)

    if(!postWithComments){
      console.log("LOADING COMMENTS...")

      this._apiRequest.getCommentsByPost(postId).pipe(
        map(comments => {
          const userUpdated = this.unifyCommentsByPost(comments, userId)
          this._state.value.users.set(userId, userUpdated!)
          this._state.next({ ...this._state.value,  })
        }),
        take(1)
      ).subscribe()
    }else {
      this._state.next({...this._state.value})
    }
  }

  unifyPostsByUser(posts: IPost[]): IUserCollection {
    const users: IUserCollection = this._state.value.users as IUserCollection
    posts.forEach((post: IPost) => {
      let postsUser = typeof users.get(post.userId)?.posts !== "undefined"
        ? users.get(post.userId)?.posts
        : []

      users.set(post.userId, {
        ...users.get(post.userId)!,
        posts: [...postsUser!, { ...post }]
      })
    })
    return new Map(users)
  }

  unifyCommentsByPost(comments: IComment[], userId: number) {
    let user = null
    if(this._state.value.users.has(userId) && comments.length) {
      user = this._state.value.users.get(userId)
      let postToModify = user?.posts?.find(post => post.id === comments[0].postId)
      postToModify!.comments = [ ...comments ]
    }
    return user
  }

  checkIfPostHasComments(postId: number, userId: number): boolean {
    if(this._state.value.users.get(userId)?.posts){
      return this._state.value.users.get(userId)?.posts?.some(post => {
        if(post.id === postId && post.comments?.length){
          return true
        }else{
          return false
        }
      }) as boolean
    }
    return false
  }
}
