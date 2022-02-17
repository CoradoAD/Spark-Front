import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor() { }

  messageBtnLeft :string = "Valider choix"
  messageBtnRight :string = "choisir autre"
  nbPlaces: number = 0;
  pathIconLeft :any = "/assets/popup-message/check.svg";
  pathIconRight :any = "/assets/popup-message/cross.svg";



  ngOnInit(): void {

  }
}
