import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  urls: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      const x = Math.floor(Math.random() * 100) + 1;
      this.urls.push('https://mdbootstrap.com/img/Photos/Slides/img%20(' + x + ').jpg');
    }
  }

}
