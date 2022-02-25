import { Component, OnInit } from '@angular/core';
import { Parking } from 'src/app/shared/models/parking';
import { ParkingDisplayService } from 'src/app/shared/services/parking-display.service';
import { ZoneService } from 'src/app/shared/services/zone.service';

@Component({
  selector: 'app-bottom-popup',
  templateUrl: './bottom-popup.component.html',
  styleUrls: ['./bottom-popup.component.scss']
})
export class BottomPopupComponent implements OnInit {


  parking!: Parking;

  constructor(private parkingDisplayService : ParkingDisplayService) { }

  ngOnInit(): void {

    setTimeout(() => this.getParking(), 20000);
  }

  getParking() {
    this.parking = this.parkingDisplayService.selectedParking$.value!;
  }

}
