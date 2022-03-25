import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Person} from "../model/person";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<Person[]>(environment.apiUrl+"Home/getAll");
  }

  updateUser(id: number, person: Person) {
    return this.http.put(environment.apiUrl+"Home/updatePerson/" + id, person,
      {headers: {"Content-Type": "application/json"}});

  }

  delete(selectedPersons: number[]) {
    return this.http.post(environment.apiUrl+"Home/Delete/", selectedPersons);
  }

  createUser(person: Person) {
    return this.http.post(environment.apiUrl+"Home/CreatePerson", person);
  }

  changeStructuralSubdivision(value: string) {
    return this.http.get<Person[]>(environment.apiUrl+"Home/changeStructuralSubdivision?selectedStructuralSubdivision=" + value)
  }
}
