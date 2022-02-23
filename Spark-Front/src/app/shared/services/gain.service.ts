import { Injectable } from '@angular/core';
import { User } from '../models/userMooc';

@Injectable({
  providedIn: 'root',
})
export class GainService {
  constructor() {}

  public calGainSpark(emissionCarbon : number) {

		let cal =  Math.ceil(emissionCarbon / 100);
		return cal;
	}

  public saveGainSpark(user : User, gainSpark : number) {

		let gainDB = user.numberOfSparks;
		gainDB = gainSpark + gainDB;

		//HTTP POST

	}

}
