import {Component, OnInit} from '@angular/core';
import {CardService} from "../service/card.service";
import {Person} from "../model/person";
import {MatDialog} from "@angular/material/dialog";
import {ChangeCardComponent} from "../change-card/change-card.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  displayedColumns: string[] = ['firstName', 'lastName', 'middleName', 'position', 'structuralSubdivision', 'serviceNumbers', 'personalNumbers', 'serviceMobileNumbers', 'change', 'delete'];
  displayedColumnsReduced = ['firstName', 'lastName', 'middleName'];
  expandedElements: Person[]=[];

  dataSource: Person[];

  constructor(private cardService: CardService, public dialog: MatDialog) {
    this.dataSource = [];
  }

  ngOnInit(): void {
    this.cardService.getAll().subscribe((value: Person[]) => {
      this.dataSource = value;
    })
    window.onresize = () => this.checkWidth();
  }


  openChangeDialog(person?: Person): void {
    this.dialog.open(ChangeCardComponent, {
      width: '600px',
      data: {
        person: person
      }
    });
  }

  deletePerson(element: Person) {
    location.reload();
    this.cardService.delete(element.id ?? 0).subscribe()
  }

  checkWidth() {
    return innerWidth > 1200;
  }


  expand(element:Person) {
    return this.expandedElements.includes(element)? this.expandedElements.splice(this.expandedElements.indexOf(element),1) : this.expandedElements.push(element)
  }

}
