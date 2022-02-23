import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Parking } from 'src/app/shared/models/parking';
import { ParkingService } from 'src/app/shared/services/parking.service';

@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss']
})
export class ParkingsComponent implements OnInit {
  parkings: Parking[] =[];
  sub:Subscription |null=null;
  constructor( private parkingService :ParkingService) { }

  ngOnInit(): void {
    this.sub = this.parkingService.allParkings$.subscribe((parkings) => {
      //console.log("dans parkings.components suscribe")
      this.parkings = parkings;
    });
    this.parkingService.getParkingList();
   // console.log("mesparkings" +this.parkings.length); 
  }
  

}
