import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ParkingClass } from 'src/app/shared/models/parkingMooc';
import { Zone } from 'src/app/shared/models/zone';
import { EmissionService } from 'src/app/shared/services/emission.service';
import { ZoneService } from 'src/app/shared/services/zone.service';
import { Vehicle } from 'src/app/shared/models/vehicle';
import { VehicleService } from 'src/app/shared/services/vehicle.service';
import { GainService } from 'src/app/shared/services/gain.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Parking } from 'src/app/shared/models/parking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messageStandard',
  templateUrl: './messageStandard.component.html',
  styleUrls: ['./messageStandard.component.scss'],
})
export class MessageStandardComponent implements OnInit, OnDestroy {
  importantMessage: string = 'important message'; //to be modified as appropriate
  message: string = 'Bravo, vous avez fait des économies et gagné des points'; //to be modified as appropriate

  emission!: number;
  gain!: number;
  isDisplay: boolean = false;

  zone!: Zone | null;
  vehicle!: Vehicle;

  currentUser!: any;
  sub!: Subscription;

  @Input()
  parking!: Parking;

  public currentZone$ = new BehaviorSubject<Zone | null>(null);
  public currentVehicle$ = new BehaviorSubject<Vehicle | null>(null);

  constructor(
    private zoneService: ZoneService,
    private emissionService: EmissionService,
    private vehicleSercice: VehicleService,
    private gainService: GainService,
    private token: TokenStorageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    /**Test Dev */
    this.test()
  }

   /**Test Dev */
  test() {
    this.currentUser = this.token.getUser();
    this.getZoneDetailsOfParking(this.parking);
    console.log("c'est le parking choisi");

    this.getVehicleUser(this.currentUser.id);
    setTimeout(() => this.calculEmission(), 500);
    setTimeout(() => this.calGainSpark(this.emission), 500);
  }


  /**
   *Get details zone of parking
   * @param parkingparking choosed by user
   */
  getZoneDetailsOfParking(parking: Parking) {

    this.sub = this.zoneService.getAllZone().subscribe((arrayResult) => {
      let result = arrayResult.find((zone) => zone.nom == parking.typo_fonct)!;
      this.currentZone$.next(result);
      this.zone = this.currentZone$.value;
      console.log(parking.nom);


    });
  }

  /**
   *Get user's vehicle
   * @param id of user's vehicle
   */
  getVehicleUser(id: number) {
    this.sub = this.vehicleSercice.getAllVehicle().subscribe((arrayResult) => {
      let result = arrayResult.find(
        (vehicle) => vehicle.vehicleUser.idUtilisateur == id
      )!;
      this.currentVehicle$.next(result);
    });
  }

  /**
   * calculate the emission consume when looking for parking
   */
  calculEmission() {
    this.zone = this.currentZone$.value;
    this.vehicle = this.currentVehicle$.value!;

    let distanceKmDone = this.emissionService.distanceLookForPark(this.zone!);
    this.emission = this.emissionService.emissionConsumedByRoute(
      distanceKmDone,
      this.vehicle
    );
  }

  /**
   *Calculate the gain of spark
   * @param emissionCarbon the emission consume when looking for parking
   */
  public calGainSpark(emissionCarbon: number) {
    this.gain = this.gainService.calGainSpark(emissionCarbon);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
