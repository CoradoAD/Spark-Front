import { Component, Input, OnInit } from '@angular/core';
import { Parking } from 'src/app/shared/models/parking';

@Component({
  selector: 'app-favoriteMessage',
  templateUrl: './favoriteMessage.component.html',
  styleUrls: ['./favoriteMessage.component.scss']
})
export class FavoriteMessageComponent implements OnInit {

  message : string = "exemple message favorite"
  iconPath: any = "/assets/popup-message/star.svg"

  @Input() parking! : Parking;


  constructor() { }

  ngOnInit(): void {
  }

}
