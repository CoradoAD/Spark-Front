import { Component, OnInit } from '@angular/core';
import { ItineraryDisplayService } from 'src/app/shared/services/itinerary-display.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, public itineraryDysplayServ: ItineraryDisplayService) {
    this.itineraryDysplayServ.setMapMarker();

  }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
