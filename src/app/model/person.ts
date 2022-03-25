import {Telephone} from "./telephone";
import {StructuralSubdivision} from "./structural-subdivision";

export class Person {
  id:number;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  structuralSubdivision: StructuralSubdivision;
  serviceNumbers: Telephone[];
  personalNumbers: Telephone[];
  serviceMobileNumbers: Telephone[];

  constructor(id:number,firstName: string, lastName: string, middleName: string, position: string, structuralSubdivision: StructuralSubdivision, serviceNumbers: Telephone[], personalNumbers: Telephone[], serviceMobileNumbers: Telephone[]) {
    this.id = id;
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

