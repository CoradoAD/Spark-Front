import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss']
})
export class AddressBarComponent implements OnInit {
  addressBarForm =new FormGroup({
    address:new FormControl('')
  });
  constructor() { }
  onSubmit(){
    console.log(this.addressBarForm);
  }

  ngOnInit(): void {
  }

}
