import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News, NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-one-news-page',
  templateUrl: './one-news-page.component.html',
  styleUrls: ['./one-news-page.component.scss'],
})
export class OneNewsPageComponent implements OnInit {
  public newsId = '';
  public news: News = { id: '', title: '', content: '' };
  constructor(private _activatedRoute: ActivatedRoute, private _newsService: NewsService) {}

  ngOnInit(): void {
    this._activatedRoute.firstChild?.params.subscribe((params) => {
      this.newsId = params['id'];

      this._newsService.getById(this.newsId).subscribe((news) => {
        this.news = news;
      });
    });
  }
}
