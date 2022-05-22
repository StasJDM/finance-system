import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-analytic-page',
  templateUrl: './analytic-page.component.html',
  styleUrls: ['./analytic-page.component.scss'],
})
export class AnalyticPageComponent implements OnInit {
  public transactionsGroups: any[] = [];
  public options: any;
  public currentMonth = new Date().getMonth();
  public currentPeriod: any;
  public tableColumns = ['label', 'amount', 'date'];
  public set selectedMonth(val: number) {
    if (val < 0 || val > 11) {
      return;
    }
    this._selectedMonth = val;
  }
  public get selectedMonth(): number {
    return this._selectedMonth;
  }

  public months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Ноябрь',
    'Декабрь',
  ];

  private _selectedMonth = new Date().getMonth();

  constructor(private _transactionService: TransactionsService) {}

  ngOnInit(): void {
    this._transactionService.getAllTransactionsGroupByMonth().subscribe((transactionsGroups) => {
      this.transactionsGroups = transactionsGroups;
      this._calculateGraphOptions();
      this.currentPeriod = this.transactionsGroups.find((tr) => tr.month === this.selectedMonth);
      this.currentPeriod.transactions = this.currentPeriod.transactions.map((tr: any) => ({
        ...tr,
        date: tr.createdAt,
      }));
    });
  }

  plusMonth(): void {
    this.selectedMonth++;
    this._calculateGraphOptions();
    this.currentPeriod = this.transactionsGroups.find((tr) => tr.month === this.selectedMonth);
    this.currentPeriod.transactions = this.currentPeriod.transactions.map((tr: any) => ({ ...tr, date: tr.createdAt }));
  }

  minusMonth(): void {
    this.selectedMonth--;
    this._calculateGraphOptions();
    this.currentPeriod = this.transactionsGroups.find((tr) => tr.month === this.selectedMonth);
    this.currentPeriod.transactions = this.currentPeriod.transactions.map((tr: any) => ({ ...tr, date: tr.createdAt }));
  }

  formatToTable(tr: any) {
    return { ...tr, date: tr.createdAt };
  }

  private _calculateGraphOptions() {
    this.options = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: this.transactionsGroups.find((trGr) => trGr.month === this.selectedMonth)?.amount.incoming || 0,
              name: 'Доходы',
            },
            {
              value: this.transactionsGroups.find((trGr) => trGr.month === this.selectedMonth)?.amount.outgoing || 0,
              name: 'Расходы',
            },
          ],
        },
      ],
    };
  }
}
