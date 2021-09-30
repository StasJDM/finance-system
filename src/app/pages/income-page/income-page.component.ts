import { Component } from '@angular/core';

@Component({
  selector: 'app-income-page',
  templateUrl: './income-page.component.html',
  styleUrls: ['./income-page.component.scss'],
})
export class IncomePageComponent {
  public tableColumns = ['name', 'type', 'amount', 'date'];
  public incomeTableData = [
    {
      name: 'Зарплата за апрель',
      type: 'зп',
      amount: 35000,
      date: '30.04.2021',
    },
    { name: 'Зарплата за май', type: 'зп', amount: 35000, date: '30.05.2021' },
    {
      name: 'Друг подарил на др',
      type: 'подарок',
      amount: 2000,
      date: '06.06.2021',
    },
    { name: 'Аванс за июнь', type: 'аванс', amount: 20000, date: '15.06.2021' },
    { name: 'Зарплата за июнь', type: 'зп', amount: 35000, date: '30.06.2021' },
  ];
}
