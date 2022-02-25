import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class GainService {
  constructor() {}

  public calGainSpark(emissionCarbon : number) {

		let cal =  Math.ceil(emissionCarbon / 100);
		return cal;
	}

}
