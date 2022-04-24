import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Item {
  id: number;
  text: string;
}

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent {
  @Input() public items: Item[] = [];

  @Output() public selected = new EventEmitter<Item>();

  public isOpen: boolean = false;

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  public select(item: Item): void {
    this.toggle();
    this.selected.emit(item);
  }
}
