import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-error-message',
  templateUrl: './popup-error-message.component.html',
  styleUrls: ['./popup-error-message.component.scss']
})
export class PopupErrorMessageComponent implements OnInit {
  @Input()
  message:string="coucou";
  constructor() { }

  ngOnInit(): void {
  }

}
