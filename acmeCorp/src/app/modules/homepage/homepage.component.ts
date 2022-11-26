import { Component, OnInit, ViewChildren, Renderer2, QueryList, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CardComponent } from 'src/app/components/card/card.component';
import { IUser } from 'src/app/models/user.model';
import { StateService } from 'src/app/store/state.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  @ViewChild('cardsWrap') cardsWrap!: ElementRef
  @ViewChildren(CardComponent, { read: ElementRef }) cardsHidden!: QueryList<ElementRef>

  areasOpened: boolean = false
  $users!: Observable<IUser[]>

  constructor(private _renderer: Renderer2, private _state: StateService) {}

  ngOnInit(): void {
    this._state.getUsers()
    this.$users = this._state.$users
  }

  /** TODO: CREATE DIRECTIVE */
  showCard(index: number|null = null) {
    if(!this.areasOpened){
      const cardSection =this.cardsWrap?.nativeElement
      typeof index === 'object'
        ? this._renderer.addClass(cardSection, 'firstCard')
        : this._renderer.addClass(cardSection, 'secondCard')
    }
  }

}
