import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messageStandard',
  templateUrl: './messageStandard.component.html',
  styleUrls: ['./messageStandard.component.scss']
})
export class MessageStandardComponent implements OnInit {

  importantMessage : string = "important message" //to be modified as appropriate
  message : string = "Lorem ipsum dolor sit amet" //to be modified as appropriate

  emission: number= 220;
  gain: number= 2

  boolean: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
