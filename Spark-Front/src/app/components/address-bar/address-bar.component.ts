import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapService } from 'src/app/shared/services/map.service';



@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss'],
})
export class AddressBarComponent implements OnInit {

  searchAddress!: string;

  departure! : any;
  departureLong! : number;
  departureLat! : number;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {

  }

  async submit() {

    const provider = new OpenStreetMapProvider();

    this.departure = await provider.search({ query: this.searchAddress });

    this.searchAddress = this.departure[0].label;
    this.departureLong = this.departure[0].x;
    this.departureLat = this.departure[0].y;

    console.log(this.departure);
    console.log(this.searchAddress);
    console.log(this.departureLong);
    console.log(this.departureLat);

  }
}
