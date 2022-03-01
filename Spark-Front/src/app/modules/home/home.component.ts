import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Map } from 'leaflet';
import { ApiAddressService } from 'src/app/shared/services/api-address.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  content?: string;

  showAddressBar!: boolean;
  showProfil!: boolean;

  constructor(private apiAddress: ApiAddressService) {}

  ngOnInit(): void {
    // this.userService.getPublicContent().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
  }

  onShowAddressBar(e: boolean) {
    if (!this.showAddressBar) {
      this.showAddressBar = e;
    } else {
      this.showAddressBar = false;
    }
  }

  onDisplayProfil(e: boolean) {
    if (!this.showProfil) {
      this.showProfil = e;
    } else {
      this.showProfil = false;
    }
  }
}
