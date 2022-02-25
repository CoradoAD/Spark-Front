import { Component, Input, OnInit } from '@angular/core';
import { Parking } from 'src/app/shared/models/parking';
import { MapService } from 'src/app/shared/services/map.service';
import { ParkingDisplayService } from 'src/app/shared/services/parking-display.service';

@Component({
  selector: 'app-bottom-popup-interactive',
  templateUrl: './bottom-popup-interactive.component.html',
  styleUrls: ['./bottom-popup-interactive.component.scss']
})
export class BottomPopupInteractiveComponent implements OnInit {
  parking?:Parking;
  
  constructor(private parkingDisplayService :ParkingDisplayService,private mapService:MapService) { }

  ngOnInit(): void {
    this.parkingDisplayService.selectedParking$.subscribe((parking)=>{
      this.parking=parking;})
  }

  deselectParking(){
    console.log("Deselect parking");
    this.parking=undefined;

  }
  launchNavigation(){
    console.log("navigation vers parking"+this.parking?.nom);
    if(this.parking){
      this.mapService.startNavigation(this.parking);
      this.deselectParking();
    }
  }
}
