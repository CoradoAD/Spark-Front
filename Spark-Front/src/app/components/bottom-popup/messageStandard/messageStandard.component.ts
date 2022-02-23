import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, filter, find, Subscription } from 'rxjs';
import { Parking } from 'src/app/shared/models/parking';
import { ParkingClass } from 'src/app/shared/models/parking-class';
import { User } from 'src/app/shared/models/user';
import { Zone } from 'src/app/shared/models/zone';
import { EmissionService } from 'src/app/shared/services/emission.service';
import { ZoneService } from 'src/app/shared/services/zone.service';
import { Vehicle } from 'src/app/shared/models/vehicle';



@Component({
  selector: 'app-messageStandard',
  templateUrl: './messageStandard.component.html',
  styleUrls: ['./messageStandard.component.scss'],
})
export class MessageStandardComponent implements OnInit, OnDestroy {
  importantMessage: string = 'important message'; //to be modified as appropriate
  message: string = 'Lorem ipsum dolor sit amet'; //to be modified as appropriate

  emission: number = 220;
  gain: number = 2;
  boolean: boolean = false;


  // Infomation from the parents
  user!: User;
  zone! : Zone;
 vehicle! : Vehicle;



  subscriptionsArray!: Subscription[];

  createParking(): Parking {
    let parking = new ParkingClass();
    parking.nom = 'Antigone';
    parking.zone = 'Centre-ville';
    return parking;
  }



  constructor(private zoneService: ZoneService, private emissionService: EmissionService) {}

  ngOnInit(): void {

    this.getZoneDetailsOfParking(this.createParking());

  }


  /**
   * Get all Zone
   */
  getZoneDetailsOfParking(parking : ParkingClass) {

     const sub = this.zoneService
    .getAllZone()
    .subscribe(arrayResult =>  {
      this.zone = arrayResult.find(item => item.nom == parking.zone)!;
    });

    this.subscriptionsArray.push(sub);
  }

  test() {

    let distanceKmDone = this.emissionService.distanceLookForPark(this.zone);
    this.emissionService.emissionConsumedByRoute(distanceKmDone, this.vehicle);
  }


  ngOnDestroy(): void {
    this.subscriptionsArray.forEach(sub => sub.unsubscribe);
  }
}
