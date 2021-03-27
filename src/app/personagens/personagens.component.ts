import { Component, OnInit } from '@angular/core';
import { Avatar } from '../avatar';
import {AVATARES} from '../mock-avatares';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  avatares: Avatar[] = AVATARES;

  selectedAvatar?: Avatar;
  onSelect(avatar: Avatar): void {
    this.selectedAvatar = avatar;
  }

  constructor() { }

  ngOnInit() {
  }

}
