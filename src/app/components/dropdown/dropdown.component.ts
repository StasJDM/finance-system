import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Item {
  id: number;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() public items: Item[] = [];

  @Output() public selected = new EventEmitter<any>();

  @Input() public selectedItem: Item;

  select(event: Event): void {
    this.selected.emit(event);
  }
}
