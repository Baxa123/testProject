import {Telephone} from "./telephone";

export class Person {
  id?:number;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  structuralSubdivision: string;
  serviceNumbers: Telephone[];
  personalNumbers: Telephone[];
  serviceMobileNumbers: Telephone[];


  constructor(firstName: string, lastName: string, middleName: string, position: string, structuralSubdivision: string, serviceNumbers: Telephone[], personalNumbers: Telephone[], serviceMobileNumbers: Telephone[],id?:number) {
    this.id=id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.position = position;
    this.structuralSubdivision = structuralSubdivision;
    this.serviceNumbers = serviceNumbers;
    this.personalNumbers = personalNumbers;
    this.serviceMobileNumbers = serviceMobileNumbers;
  }
}
