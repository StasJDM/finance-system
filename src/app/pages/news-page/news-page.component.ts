import { Component, OnInit } from '@angular/core';
import { News, NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  public news: News[] = [];

  constructor(private _newsService: NewsService) {}

  ngOnInit(): void {
    this._newsService.getAll().subscribe((news) => {
      this.news = news;
    });
  }
}
