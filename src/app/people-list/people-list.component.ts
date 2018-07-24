import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent {
  @Input() people;
  @Output() addPerson = new EventEmitter<any>();
  @Output() editPerson = new EventEmitter<any>();
}
