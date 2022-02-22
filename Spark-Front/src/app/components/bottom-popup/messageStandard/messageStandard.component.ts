import { Component, OnInit } from '@angular/core';
import { Parking } from 'src/app/shared/models/parking';
import { User } from 'src/app/shared/models/user';
import { EmissionService } from 'src/app/shared/services/emission.service';
import { ZoneService } from 'src/app/shared/services/zone.service';

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
  boolean: boolean = false

  //Infomation from the parents
  user! : User;
  parking! : Parking;



  constructor(private emissionService : EmissionService, private zoneService : ZoneService) { }

  ngOnInit(): void {

    //Infomation from the parents
    this.user.username = "wowey";
    this.user.nbSpark = 10;
    this.parking.nom = "Antigone";
    this.parking.zone = "Centre-ville";


    console.log(this.zoneService.findZoneDetailsByParking(this.parking));


  }
}
