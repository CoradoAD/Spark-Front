import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoriteMessage',
  templateUrl: './favoriteMessage.component.html',
  styleUrls: ['./favoriteMessage.component.scss']
})
export class FavoriteMessageComponent implements OnInit {

  message : string = "exemple message favorite"
  iconPath: any = "/assets/popup-message/star.svg"

  constructor() { }

  ngOnInit(): void {
  }

}
