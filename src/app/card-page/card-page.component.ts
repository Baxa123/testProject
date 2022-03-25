import {Component, OnInit} from '@angular/core';
import {CardService} from "../service/card.service";
import {Person} from "../model/person";
import {MatDialog} from "@angular/material/dialog";
import {ChangeCardComponent} from "../change-card/change-card.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {StructuralSubdivision} from "../model/structural-subdivision";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CardPageComponent implements OnInit {
  displayedColumns: string[] = ['toDelete', 'firstName', 'lastName', 'middleName', 'position', 'structuralSubdivision', 'serviceNumbers', 'personalNumbers', 'serviceMobileNumbers', 'change'];
  displayedColumnsReduced = ['toDelete', 'firstName', 'lastName', 'middleName'];
  expandedElements: Person[] = [];
  selectedPersons: number[] = [];
  dataSource = new MatTableDataSource<Person>();
  isAsc = -1;
  selectedStructuralSubdivision = new FormControl();
  keys = StructuralSubdivision;

  constructor(private cardService: CardService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cardService.getAll().subscribe((value: Person[]) => {
      this.dataSource.data = value;
    })
    window.onresize = () => this.checkWidth();
  }

  sort() {
    this.isAsc *= -1;
    this.dataSource.data = this.dataSource.data.sort((element1, element2) => {
      return this.isAsc * (Number(element2.structuralSubdivision) - Number(element1.structuralSubdivision))
    })

  }

  openChangeDialog(person?: Person): void {
    this.dialog.open(ChangeCardComponent, {
      width: '600px',
      data: {
        person: person
      }
    });
  }

  deletePersons() {
    this.cardService.delete(this.selectedPersons).subscribe()
  }

  checkWidth() {
    return innerWidth > 1200;
  }

  expand(element: Person) {
    return this.expandedElements.includes(element) ? this.expandedElements.splice(
      this.expandedElements.indexOf(element), 1) : this.expandedElements.push(element)
  }

  selectionChange(event: MatCheckboxChange, element: Person) {
    if (event.checked) {
      this.selectedPersons.push(element.id);
    } else {
      this.selectedPersons.splice(this.selectedPersons.indexOf(element.id), 1);
    }
  }

  isChecked(element: Person) {
    return this.selectedPersons.includes(element.id);
  }

  changeStructuralSubdivision(selected:MatSelectChange) {
     this.cardService.changeStructuralSubdivision(selected.value).subscribe((response:Person[])=>this.dataSource.data=response);
  }
}
