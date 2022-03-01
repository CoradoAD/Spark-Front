import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Parking } from 'src/app/shared/models/parking';
import { ParkingDisplayService } from 'src/app/shared/services/parking-display.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  parking?:Parking;
  @Input()
  boolean :boolean = true;//to be modified as appropriate
  @Output()
  deselectParking=new EventEmitter();
  @Output()
  launchNavigation=new EventEmitter();
  constructor(private parkingDisplayService:ParkingDisplayService) { }

  messageBtnLeft :string = "Go!"//to be modified as appropriate
  messageBtnRight :string = "Autre parking"
  @Input()
  nbPlaces: number = 0;
  pathIconLeft :any = "/assets/popup-message/check.svg";
  pathIconRight :any = "/assets/popup-message/cross.svg";
  ngOnInit(): void {
    this.parkingDisplayService.selectedParking$.subscribe((parking)=>{
      console.log("parking update")
      this.parking=parking;})
  }

  close(){
    this.deselectParking.emit();
  }
  onLaunchNavigation(){
    console.log("on launch navigation");
    this.launchNavigation.emit();

  }
}
