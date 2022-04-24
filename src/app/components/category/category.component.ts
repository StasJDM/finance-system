import { Component, Input } from '@angular/core';

const colors = [
  '#DE4C8A',
  '#DC9D00',
  '#063971',
  '#35682D',
  '#C51D34',
  '#C93C20',
  '#AEA04B',
  '#1F3438',
  '#015D52',
  '#5B3A29',
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  public color: string = '#dadada';

  @Input() set text(str: string) {
    if (!str || !str.length) return;

    this._text = str;
    this.color = this._calculateColor(str);
  }
  get text(): string {
    return this._text;
  }

  private _text: string = '';

  private _calculateColor(str: string): string {
    const pos = (str.length + str.charCodeAt(0) + str.charCodeAt(str.length - 1)) % 10;
    return colors[pos];
  }
}
