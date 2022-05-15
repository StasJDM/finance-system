import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface Item {
  id: number;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() public items: Item[] = [];

  @Output() public selected = new EventEmitter<any>();

  @Input() public selectedItem: Item;

  ngOnInit(): void {}

  select(event: Event): void {
    console.log(event);
    this.selected.emit(event);
  }
}
