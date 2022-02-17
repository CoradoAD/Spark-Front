import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  importantMessage : string = "important message"
  message : string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sagittis ligula"

  constructor() { }

  ngOnInit(): void {
  }

}
