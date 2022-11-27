import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { IUserCollection } from 'src/app/models/state.model';
import { HomepageComponent } from 'src/app/modules/homepage/homepage.component';
import { StateService } from 'src/app/store/state.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  @Input() cardData!: Map<number, any>
  @Input() section!: string
  @Output() eventClickCard = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    if(this.section === "comments"){
      console.log("DATA:", this.cardData)
      // console.log("VALUE:", this.cardData.value)

    }
  }

  onClickCard(event: any){
    this.eventClickCard.emit(event)
  }
}
