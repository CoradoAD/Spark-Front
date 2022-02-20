import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  boolean :boolean = false;//to be modified as appropriate

  constructor() { }

  messageBtnLeft :string = "Valider choix"//to be modified as appropriate
  messageBtnRight :string = "choisir autre"

  nbPlaces: number = 0;
  pathIconLeft :any = "/assets/popup-message/check.svg";
  pathIconRight :any = "/assets/popup-message/cross.svg";


  ngOnInit(): void {

  }
}
