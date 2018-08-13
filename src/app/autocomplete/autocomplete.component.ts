import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {University} from "../models/university.model.client";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();
  @Input() options: University[];
  @Input() valueChange: Function;
  filteredOptions: Observable<University> = new Observable<University>();

  ngOnInit() {
    this.filteredOptions = <any>this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): object[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => {
      if (option.name.toLowerCase().includes(filterValue)) {
        return option;
      }
    })
  }
}
