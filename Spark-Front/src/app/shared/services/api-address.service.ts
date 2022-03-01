import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_URL = 'https://api-adresse.data.gouv.fr/search/?q='


@Injectable({
  providedIn: 'root'
})
export class ApiAddressService {

  constructor(private http: HttpClient) { }


  getAdress(adress : string) : Observable<any> {
    return this.http.get<any>(API_URL + adress + "&autocomplete=1")
  }

}
