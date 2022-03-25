import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Person} from "../model/person";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<Person[]>("https://localhost:7157/Home/getAll");
  }

  updateUser(id: number, person: Person) {
    return this.http.put("https://localhost:7157/Home/updatePerson/" + id, person,
      {headers: {"Content-Type": "application/json"}});

  }

  delete(selectedPersons: number[]) {
    return this.http.post("https://localhost:7157/Home/Delete/", selectedPersons);
  }

  createUser(person: Person) {
    return this.http.post("https://localhost:7157/Home/CreatePerson", person);
  }

  changeStructuralSubdivision(value: string) {
    return this.http.get<Person[]>("https://localhost:7157/Home/changeStructuralSubdivision?selectedStructuralSubdivision=" + value)
  }
}
