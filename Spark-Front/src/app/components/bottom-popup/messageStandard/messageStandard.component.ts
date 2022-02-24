import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, filter, find, Observable, Subscription } from 'rxjs';
import { ParkingClass } from 'src/app/shared/models/parkingMooc';
import { User } from 'src/app/shared/models/userMooc';
import { Zone } from 'src/app/shared/models/zone';
import { EmissionService } from 'src/app/shared/services/emission.service';
import { ZoneService } from 'src/app/shared/services/zone.service';
import { Vehicle } from 'src/app/shared/models/vehicle';
import { VehicleService } from 'src/app/shared/services/vehicle.service';
import { UserService } from 'src/app/shared/services/userMooc.service';
import { GainService } from 'src/app/shared/services/gain.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { ParkingDisplayService } from 'src/app/shared/services/parking-display.service';
import { Parking } from 'src/app/shared/models/parking';

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

  // Infomation from the parents
  user!: User;
  zone!: Zone | null;
  vehicle!: Vehicle;

  
  parking!: Parking;


  public currentZone$ = new BehaviorSubject<Zone | null>(null);
  public currentParking$ = new BehaviorSubject<ParkingClass | null>(null);
  public currentVehicle$ = new BehaviorSubject<Vehicle | null>(null);

  currentUser!: any;

  /**
   *MOOC parking
   * @returns parking
   */
  createParking(): ParkingClass {
    let parking = new ParkingClass();
    parking.nom = 'Antigone';
    parking.zone = 'Centre-ville';
    return parking;
  }

  getParking() {
    const parking = this.createParking();
    this.currentParking$.next(parking);
  }

  constructor(
    private zoneService: ZoneService,
    private emissionService: EmissionService,
    private vehicleSercice: VehicleService,
    private gainService: GainService,
    private token: TokenStorageService,
    private parkingDisplayService : ParkingDisplayService

  ) {}

  ngOnInit(): void {
    setTimeout(() => this.test(), 6000);
  }


  test() {

    this.currentUser = this.token.getUser();
    console.log(this.currentUser);

    this.parking = this.parkingDisplayService.selectedParking$.value!;
    console.log("parking choisi" + this.parking);

    this.getZoneDetailsOfParking(this.parking);

    this.getVehicleUser(this.currentUser.id);

    setTimeout(() => this.calculEmission(), 500);
    setTimeout(() => this.calGainSpark(this.emission), 500);
  }

  sub!: Subscription;

  /**
   *Get details zone of parking
   * @param parkingparking choosed by user
   */
  getZoneDetailsOfParking(parking: Parking) {
    console.log('Le parking MOOC est : ' + parking.nom + parking.typo_fonct);

    this.sub = this.zoneService.getAllZone().subscribe((arrayResult) => {
      let result = arrayResult.find((zone) => zone.nom == parking.typo_fonct)!;
      this.currentZone$.next(result);
      this.zone = this.currentZone$.value;
    });
  }

  /**
   *Get user's vehicle
   * @param id of user's vehicle
   */
  getVehicleUser(id : number) {
    this.sub = this.vehicleSercice.getAllVehicle().subscribe((arrayResult) => {
      let result = arrayResult.find((vehicle) => vehicle.vehicleUser.idUtilisateur == id)!;
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
    this.emission = this.emissionService.emissionConsumedByRoute(distanceKmDone,this.vehicle);
  }

  /**
   *Calculate the gain of spark
   * @param emissionCarbon the emission consume when looking for parking
   */
  public calGainSpark(emissionCarbon : number) {
    this.gain = this.gainService.calGainSpark(emissionCarbon);
	}


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
