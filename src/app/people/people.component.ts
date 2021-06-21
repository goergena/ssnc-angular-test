import { Component, OnInit } from '@angular/core';
import { Observable, of, pipe } from "rxjs"
import { Injectable } from "@angular/core";
import {map} from "rxjs/operators";

export class Person {
  constructor (
  public id: number,
  public name: string,
  public age: number,
  public department: string,
  ) {
      
  }
}
@Injectable({
  providedIn: "root"
})

export class PeopleService {
  public array: Person[] = [
    new Person(1, 'Vsevolod', 25, 'Technology'),
    new Person(2, 'Anthony', 26, 'Technology'),
    new Person(1, 'Stephanie', 29, 'Human Resources'),
    new Person(1, 'Edwin', 24, 'Investment'),

  ];

  getData(): Observable<Person[]> {
    return of(this.array);
  }
}

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  //people = PEOPLE;
  data$: Observable<Person>;

  constructor(public service: PeopleService) {

   }

  ngOnInit() {
   this.data$ = this.service.getData();
  }

  sort(column){
    this.data$ = this.data$.pipe(map((data) => {
    data.sort((a, b) => {
        return a[column] < b[column] ? -1 : 1;
     //   return a[column].localeCompare(b[column])
     });
    return data;
    }))
  }

}
