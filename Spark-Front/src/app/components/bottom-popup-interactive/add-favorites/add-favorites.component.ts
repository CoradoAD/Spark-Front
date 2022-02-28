import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-favorites',
  templateUrl: './add-favorites.component.html',
  styleUrls: ['./add-favorites.component.scss']
})
export class AddFavoritesComponent implements OnInit {
  @Input()
  message : string = "Lorem itsum ilsim"
  iconPath: any = "/assets/popup-message/star.svg"

  constructor() { }

  ngOnInit(): void {

  }

}
