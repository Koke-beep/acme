import {
  Component,
  OnInit,
  ViewChildren,
  Renderer2,
  QueryList,
  ElementRef,
  ViewEncapsulation,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {  Subscription } from 'rxjs';
import { CardComponent } from 'src/app/components/card/card.component';
import { IComment, IPost, IUserCollection } from 'src/app/models/state.model';
import { IUser } from 'src/app/models/user.model';
import { StateService } from 'src/app/store/state.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit, OnDestroy {
  @ViewChild('cardsWrap') cardsWrap!: ElementRef
  @ViewChildren(CardComponent, { read: ElementRef }) cardsHidden!: QueryList<ElementRef>

  usersSubs!: Subscription
  usersCollection:  IUserCollection = new Map()

  areasOpened: boolean = false
  userSelected: IUserCollection = new Map()
  selectedPostId!: number | null
  currentComments: Map<number, IComment> = new Map()

  constructor(private _renderer: Renderer2, private _store: StateService) {}

  ngOnInit(): void {
    this._store.getUsers()

    this.usersSubs = this._store.$users.subscribe(({users, idUserSelected}) => {
      this.usersCollection = users
      if(users.has(idUserSelected)) {
        this.userSelected = new Map()
        this.userSelected.set(idUserSelected, users.get(idUserSelected)!)

        this.setCommentsUser(idUserSelected)
      }
    })
  }

  ngOnDestroy(): void {
    this.usersSubs.unsubscribe()
  }

  /** TODO: CREATE DIRECTIVE */
  showCard(index: number|null = null) {
    if(!this.areasOpened) {
      const cardSection =this.cardsWrap?.nativeElement
      typeof index === 'object'
        ? this._renderer.addClass(cardSection, 'firstCard')
        : this._renderer.addClass(cardSection, 'secondCard')
    }
  }

  setCommentsUser(id: number) {
    if(this.selectedPostId !== null){
      const commentsPost = this.userSelected.get(id)?.posts?.find(post => post.id === this.selectedPostId)
      this.currentComments = new Map().set(0, commentsPost?.comments)
    }else{
      this.currentComments = new Map()
    }
  }

  getPostsUser(user: IUser) {
    this.selectedPostId = null
    this.showCard()
    this._store.getPostsUser(user.id)
  }

  getPostComments(post: IPost) {
    this.selectedPostId = post.id ||  null
    this.showCard(2)
    this._store.getPostComments({ postId: post.id, userId: post.userId })
  }

  loadMoreUsers(lastUserId: number) {
    this._store.getMoreUsers(lastUserId)
  }
}
