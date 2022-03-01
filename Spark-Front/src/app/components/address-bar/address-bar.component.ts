import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Control, map, Map } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapService } from 'src/app/shared/services/map.service';
import { GeoSearchControl } from 'leaflet-geosearch';
import { ApiAddressService } from 'src/app/shared/services/api-address.service';
import { BehaviorSubject } from 'rxjs';

const provider = new OpenStreetMapProvider();

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss'],
})
export class AddressBarComponent implements OnInit {

  searchAddress!: string;

  departure: any;
  departureLong!: number;
  departureLat!: number;
  adressNameDeparture!: any;

  show: boolean = false;

  public address$ = new BehaviorSubject<any | null>(null);

  constructor(private apiAddress: ApiAddressService) {}

  ngOnInit(): void {

  }

  findAddress(adress: string) {
    this.apiAddress
      .getAdress(adress)
      .subscribe((result) => this.address$.next(result.features));
      this.address$.forEach((item) => {
      this.departure = item;
    });
  }

  eventInput() {

    if (this.searchAddress.length > 2) {
      this.show = true;
      this.findAddress(this.searchAddress);
    }else if (this.searchAddress = ' ') {
      this.show = false;
    }
  }

  chooseAdress(adress: string) {
    this.searchAddress = adress;
    this.show = false;
  }

  submit() {
    this.departure.forEach((element) => {
      if (element.properties.label == this.searchAddress) {
        this.departure[0] = element;
      }
    });

    this.adressNameDeparture = this.departure[0].properties.label;
    this.departureLong = this.departure[0].properties.x;
    this.departureLat = this.departure[0].properties.y;

    console.log(this.departure);
    console.log(this.adressNameDeparture);
    console.log(this.departureLong);
    console.log(this.departureLat);
  }

  // async submit() {

  //   console.log(this.departure);

  //   this.departure.forEach((element) => {
  //     if (element.label == this.searchAddress) {
  //       this.departure[0] = element;
  //     }
  //   });

  //   this.test = this.departure[0].label;
  //   this.departureLong = this.departure[0].x;
  //   this.departureLat = this.departure[0].y;

  //   console.log(this.departure);
  //   console.log(this.test);
  //   console.log(this.departureLong);
  //   console.log(this.departureLat);
  // }

  // async eventInput() {

  //   this.show = true;
  //   this.departure = await provider.search({ query: this.searchAddress });
  //   console.log(this.departure);
  // }

  // chooseAdress(address: string) {
  //   this.searchAddress = address;
  //   this.show = false;
  // }
}
