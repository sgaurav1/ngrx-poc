import { Component, OnInit } from '@angular/core';
import {ROUTES} from '../../utilities/routes';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  routes = ROUTES;
  constructor() { }

  ngOnInit(): void {
  }

}
