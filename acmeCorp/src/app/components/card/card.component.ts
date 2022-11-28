import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent{
  // TODO Improve: makes the input variable key-value (more reusable) for avoid switch statements (HTML) and remove @Input section

  @Input() cardData!: Map<number, any>
  @Input() section!: string
  @Output() eventClickCard = new EventEmitter()
  @Output() eventLoadUsers = new EventEmitter()

  constructor() { }

  onClickCard(event: Event){
    this.eventClickCard.emit(event)
  }

  loadMoreUsers(){
    debugger
    const lastUserId = Array.from(this.cardData)[this.cardData.size -1][0]
    this.eventLoadUsers.emit(lastUserId)
  }
}
