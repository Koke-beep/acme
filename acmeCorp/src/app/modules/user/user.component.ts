import { Component, OnInit } from '@angular/core';
import { createUserForm } from 'src/assets/static/create-user-form';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  newUserForm = createUserForm

  constructor() { }

  ngOnInit(): void {}

}
