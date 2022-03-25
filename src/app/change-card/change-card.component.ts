import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormControl} from "@angular/forms";
import {Telephone} from "../model/telephone";
import {CardService} from "../service/card.service";
import {Person} from "../model/person";
import {StructuralSubdivision} from "../model/structural-subdivision";

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
  serviceNumbersControls: FormControl[] = [];
  personalNumbersControls: FormControl[] = [];
  serviceMobileNumbersControls: FormControl[] = [];
  keys = StructuralSubdivision;
  selectedStructuralSubdivision: FormControl = new FormControl();
  isFormValid=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private cardService: CardService) {
    if (data.person == null) {
      this.serviceNumbersControls.push(new FormControl())
      this.personalNumbersControls.push(new FormControl())
      this.serviceMobileNumbersControls.push(new FormControl())
      return;
    }
    this.firstNameControl.setValue(data.person.firstName);
    this.lastNameControl.setValue(data.person.lastName);
    this.middleNameControl.setValue(data.person.middleName);
    this.positionControl.setValue(data.person.position);
    this.selectedStructuralSubdivision.setValue(data.person.structuralSubdivision);
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
    if(this.validate()) {
      let person = new Person(-1, this.firstNameControl.value,
        this.lastNameControl.value,
        this.middleNameControl.value,
        this.positionControl.value,
        this.selectedStructuralSubdivision.value,
        this.serviceNumbersControls.map(serviceNumbersControl => new Telephone(serviceNumbersControl.value)),
        this.personalNumbersControls.map(personalNumbersControl => new Telephone(personalNumbersControl.value)),
        this.serviceMobileNumbersControls.map(
          serviceMobileNumbersControl => new Telephone(serviceMobileNumbersControl.value)))
      if (this.data.person == undefined) {
        this.cardService.createUser(person).subscribe();
      } else {
        this.cardService.updateUser(this.data.person.id, person).subscribe();
      }
      location.reload();
    }
  }

  validate() {
    return this.firstNameControl.valid &&
      this.lastNameControl.valid &&
      this.middleNameControl.valid &&
      this.positionControl.valid &&
      this.selectedStructuralSubdivision.valid &&
      this.serviceNumbersControls.length!=0&&
      this.personalNumbersControls.length!=0&&
      this.serviceMobileNumbersControls.length!=0&&
      this.serviceNumbersControls.filter(serviceNumbersControl => !serviceNumbersControl.valid).length == 0 &&
      this.personalNumbersControls.filter(personalNumbersControl => !personalNumbersControl.valid).length == 0 &&
      this.serviceMobileNumbersControls.filter(
        serviceMobileNumbersControl => !serviceMobileNumbersControl.valid).length == 0
  }

  removeServiceNumber(index: number) {
    this.serviceNumbersControls.splice(index, 1);
  }

  removePersonalNumber(index: number) {
    this.personalNumbersControls.splice(index, 1);
  }

  removeServiceMobileNumber(index: number) {
    this.serviceMobileNumbersControls.splice(index, 1);
  }
}
