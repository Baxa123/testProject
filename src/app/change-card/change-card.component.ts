import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Telephone} from "../model/telephone";
import {CardService} from "../service/card.service";
import {Person} from "../model/person";

@Component({
  selector: 'app-change-card',
  templateUrl: './change-card.component.html',
  styleUrls: ['./change-card.component.css']
})
export class ChangeCardComponent {
  firstNameControl = new FormControl();
  lastNameControl = new FormControl();
  middleNameControl = new FormControl();
  positionControl = new FormControl();
  structuralSubdivisionControl = new FormControl();
  serviceNumbersControls: FormControl[] = [];
  personalNumbersControls: FormControl[] = [];
  serviceMobileNumbersControls: FormControl[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder,private cardService: CardService) {
    if(data.person==null){
      return;
    }
    this.firstNameControl.setValue(data.person.firstName);
    this.lastNameControl.setValue(data.person.lastName);
    this.middleNameControl.setValue(data.person.middleName);
    this.positionControl.setValue(data.person.position);
    this.structuralSubdivisionControl.setValue(data.person.structuralSubdivision);
    data.person.serviceNumbers.map((serviceNumber: Telephone) => {
      let formControl = new FormControl();
      formControl.setValue(serviceNumber.number);
      this.serviceNumbersControls.push(formControl);
    });
    data.person.personalNumbers.map((personalNumber: Telephone) => {
      let formControl = new FormControl();
      formControl.setValue(personalNumber.number);
      this.personalNumbersControls.push(formControl);
    });
    data.person.serviceMobileNumbers.map((serviceMobileNumber: Telephone) => {
      let formControl = new FormControl();
      formControl.setValue(serviceMobileNumber.number);
      this.serviceMobileNumbersControls.push(formControl);
    });
  }

  addServiceNumbersControl() {
    this.serviceNumbersControls.push(new FormControl());
  }

  addPersonalNumbersControl() {
    this.personalNumbersControls.push(new FormControl());
  }

  addServiceMobileNumbersControl() {
    this.serviceMobileNumbersControls.push(new FormControl());
  }

  updateUser() {
    let person=new Person(this.firstNameControl.value,
      this.lastNameControl.value,
      this.middleNameControl.value,
      this.positionControl.value,
      this.structuralSubdivisionControl.value,
      this.serviceNumbersControls.map(serviceNumbersControl=>new Telephone(serviceNumbersControl.value)),
      this.personalNumbersControls.map(personalNumbersControl=>new Telephone(personalNumbersControl.value)),
      this.serviceMobileNumbersControls.map(serviceMobileNumbersControl=>new Telephone(serviceMobileNumbersControl.value)))
    if(this.data.person==undefined){
      this.cardService.createUser(person).subscribe();
      return;
    }
    this.cardService.updateUser(this.data.person.id,person).subscribe();
    location.reload();
  }

  removeServiceNumber(index:number) {
    this.serviceNumbersControls.splice(index,1);
  }

  removePersonalNumber(index: number) {
    this.personalNumbersControls.splice(index,1);
  }

  removeServiceMobileNumber(index: number) {
    this.serviceMobileNumbersControls.splice(index,1);
  }
}
