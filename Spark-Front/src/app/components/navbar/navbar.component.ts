import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @Output() showAddressBar = new EventEmitter<boolean>();
  @Output() showProfil = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  show() {
    this.showAddressBar.emit(true);
  }

  displayProfil() {
    this.showProfil.emit(true)
    
  }
}

