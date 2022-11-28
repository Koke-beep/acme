import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static ROUTES = ['homepage', 'user']

  constructor(private _router: Router, private route: ActivatedRoute) {}

  redirectPage(index: number) {
    if(index === 0){
      localStorage.clear()
    }
    this._router.navigate([AppComponent.ROUTES[index]], { relativeTo: this.route})
  }
}
