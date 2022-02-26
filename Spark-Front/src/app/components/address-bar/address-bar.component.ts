import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Control, map, Map } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapService } from 'src/app/shared/services/map.service';
import { GeoSearchControl } from 'leaflet-geosearch';

const provider = new OpenStreetMapProvider();


@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss'],
})
export class AddressBarComponent implements OnInit {
  searchAddress!: string;

  departure!: any;
  departureLong!: number;
  departureLat!: number;
  test!: any;

  map!: Map;
  show: boolean = false;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}

  async submit() {

    console.log(this.departure);

    this.departure.forEach((element) => {
      if (element.label == this.searchAddress) {
        this.departure[0] = element;
      }
    });

    this.test = this.departure[0].label;
    this.departureLong = this.departure[0].x;
    this.departureLat = this.departure[0].y;

    console.log(this.departure);
    console.log(this.test);
    console.log(this.departureLong);
    console.log(this.departureLat);
  }

  async eventInput() {

    this.show = true;
    this.departure = await provider.search({ query: this.searchAddress });
    console.log(this.departure);
  }

  chooseAdress(address: string) {
    this.searchAddress = address;
    this.show = false;
  }

}
