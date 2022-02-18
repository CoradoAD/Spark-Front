import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  importantMessage : string = "important message" //to be modified as appropriate
  message : string = "Lorem ipsum dolor sit amet" //to be modified as appropriate

  emission: number= 220;
  gain: number= 2

  boolean: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
