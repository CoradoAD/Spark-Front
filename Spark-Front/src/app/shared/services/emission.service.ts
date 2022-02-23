import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root',
})
export class EmissionService {
  constructor() {}

  /**
	 * Method to calculate the distance traveled by a user looking for a carpark
	 *
	 */
  public distanceLookForPark(zone: Zone) {
    let time = Math.ceil(zone.minute / 60 + 1); // result in hour
    let speed = 20;
    return speed * time;
  }

    /**
     *Method to calculate footprint carbon by consomation of *the user's car
     * @param vehicle
     * @returns custom values footprint carbon
     */
	// if the vehicle'energy of client is "Diesel or Essence"
  public carbonFootprintByConso(vehicle: Vehicle) {
    let consomation = vehicle.consomation;
    let energy = vehicle.energy;
    let coefficient = energy.coefficient;
    return Math.ceil((consomation * coefficient) / 100);
  }


  	/**
	 * Method to calculate the carbon emission when a user looking for a carpark
	 * (with custom values footprint carbon)
	 */
  public emissionConsumedByRoutePerso(
    distanceKmDone: number,
    carbonFootprint: number
  ) {
    return carbonFootprint * distanceKmDone;
  }


  /**
   *
   * @param distanceKmDone -> The distance traveled by a user looking for a carpark (distanceLookForPark(zone: Zone))
   * @param vehicle -> vehicle of currentUser
   * @returns emissions consumedByRoute
   */
  public emissionConsumedByRoute(distanceKmDone: number, vehicle: Vehicle) {
    let energy = vehicle.energy;
    return energy.coefficient * distanceKmDone;
  }
}
