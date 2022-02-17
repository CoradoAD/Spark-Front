import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-favorites',
  templateUrl: './add-favorites.component.html',
  styleUrls: ['./add-favorites.component.scss']
})
export class AddFavoritesComponent implements OnInit {

  message : string = "exemple message favorite"
  iconPath: any = "/assets/popup-message/star.svg"

  constructor() { }

  ngOnInit(): void {
  }

}
