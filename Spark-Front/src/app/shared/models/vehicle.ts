import { Energy } from "./energy";
import { TypeVehicle } from "./type-vehicle";
import { User } from "./user";

export interface Vehicle {

  consomation : number;
  energy : Energy;
  user : User;
  typeVehicle : TypeVehicle;

}
