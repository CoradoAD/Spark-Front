import { BuiltinTypeName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';

/**
 * Set icon remplacement based on DOM query
 * ex: class="leaflet-routing-icon-turn-right" => spark-nav-right.svg
 * replace background image and bkg-img height & width
 */
@Injectable({
  providedIn: 'root'
})
export class ItineraryDisplayService {
  private userMarker = document.querySelector('leaflet-pane leaflet-marker-pane:nth-child(2)');
  //  = document.getElementsByClassName('leaflet-pane leaflet-marker-pane:nth-child(2)');
  private destMarker = document.querySelector('leaflet-pane leaflet-marker-pane:nth-child(2)');

  private navRoundabout = document.querySelector('leaflet-routing-icon-enter-roundabout');
  private testEl = document.getElementsByClassName('leaflet-routing-icon-enter-roundabout');


  constructor() {
   }

  /**
   * Set 'Spark' App version of Nav Markers
   */
  setMapMarker() {
    console.log(this.userMarker);

    console.log(this.destMarker);


    // this.userMarker!.className = 'leaflet-zoom-animated leaflet-interactive leaflet-marker-draggable';
    // this.destMarker!.className = 'leaflet-zoom-animated leaflet-interactive leaflet-marker-draggable';
    // this.navRoundabout!.style


  //   L.Routing.control({
  //     waypoints: [
  //       L.latLng(57.74, 11.94),    // startmarker
  //       L.latLng(57.6792, 11.949) // endmarker
  //     ],
  //     createMarker: function(i, wp, nWps) {
  //       if (i === 0 || i === nWps - 1) {
  //         // here change the starting and ending icons
  //         return L.marker(wp.latLng, {
  //           icon: greenIcon // here pass the custom marker icon instance
  //         });
  //       } else {
  //         // here change all the others
  //         return L.marker(wp.latLng, {
  //           icon: yourOtherCustomIconInstance
  //         });
  //       }
  //     }
  //   }).addTo(map);
  // }

  // L.Routing.control({
  //   waypoints: [
  //     L.latLng(36.3603179, 59.5041424),
  //     L.latLng(36.3279067, 59.5248145)
  //   ],
  //   routeWhileDragging: true,
  //   // lineOptions: {
  //   //   styles: [{ color: 'green', opacity: 1, weight: 5 }]
  //   // },
  //   createMarker: function (i: number, waypoint: any, n: number) {
  //     const marker = L.marker(waypoint.latLng, {
  //       draggable: true,
  //       bounceOnAdd: false,
  //       bounceOnAddOptions: {
  //         duration: 1000,
  //         height: 800,
  //         function() {
  //           (bindPopup(myPopup).openOn(map))
  //         }
  //       },
  //       icon: L.icon({
  //         iconUrl: './assets/global/img/mapmarker-red.png',
  //         iconSize: [38, 95],
  //         iconAnchor: [22, 94],
  //         popupAnchor: [-3, -76],
  //         shadowUrl: './assets/global/img/marker-shadow.png',
  //         shadowSize: [68, 95],
  //         shadowAnchor: [22, 94]
  //       })
  //     });
  //     return marker;
  //   }
  // }).addTo(map);


  // L.Routing.control({
  //   waypoints: [
  //     L.latLng(36.3603179, 59.5041424),
  //     L.latLng(36.3279067, 59.5248145)
  //   ],
  //   routeWhileDragging: true,
  //   lineOptions: {
  //     styles: [
  //       { color: 'green', opacity: 1, weight: 5 },
  //     ],
  //     extendToWaypoints: true,
  //     missingRouteTolerance: 1,
  //   },
  // // createMarker: function (_i: number, waypoint: any, _n: number) {
  //   //   const marker = L.marker(waypoint.latLng, {
  //   //     draggable: true,
  //   //     icon: L.icon({
  //   //       iconUrl: './assets/global/img/mapmarker-red.png',
  //   //       iconSize: [38, 95],
  //   //       iconAnchor: [22, 94],
  //   //       popupAnchor: [-3, -76],
  //   //       shadowUrl: './assets/global/img/marker-shadow.png',
  //   //       shadowSize: [68, 95],
  //   //       shadowAnchor: [22, 94]
  //   //     })
  //   //   });
  //   //   return marker;
  //   // }
  // }).addTo(map);

  // temp routing-machine test marker
        //   createMarker:function(i, waypoint, n) {
      //     if (i === 0 || i === n - 1) {
      //         return L.marker(waypoint.latLng, {icon: this.myUserIcon });
      //     } else {
      //         return L.marker(waypoint.latLng, {icon: this.myUserIcon });
      //     }
      // }


        // createMarker: function(i: number, wp: { latLng: L.LatLngExpression; }, nWps: number) {
        //   if (i == 0 || i == nWps - 1) {
        //     return L.marker(wp.latLng, {icon: this.myUserIcon})
        //   }
        // },

  }
}
