import { Component, OnInit } from '@angular/core';
import { Avatar } from '../avatar';
import { AvatarService } from '../avatar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  avatares: Avatar[] = [];

  constructor(private heroService: AvatarService) { }

  ngOnInit() {
    this.getAvatares();
  }

  getAvatares(): void {
    this.heroService.getAvatares()
      .subscribe(avatares => this.avatares = avatares.slice(1, 5));
  }

}
