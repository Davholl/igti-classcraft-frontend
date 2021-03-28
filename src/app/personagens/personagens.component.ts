import { Component, OnInit } from '@angular/core';
import { Avatar } from '../avatar';
import { AvatarService } from '../avatar.service';
import { MessageService } from '../message.service';
import {AVATARES} from '../mock-avatares';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  avatares: Avatar[] = [];

  selectedAvatar?: Avatar;

  constructor(private avatarService: AvatarService, private messageService: MessageService) { }

  ngOnInit() {
    this.getAvatares();
  }

  onSelect(avatar: Avatar): void {
    this.selectedAvatar = avatar;
    this.messageService.add(`PersonagensComponent: Selected avatar id=${avatar.avatarId}`);
  }

  getAvatares(): void {
    this.avatarService.getAvatares().subscribe(avatares => this.avatares = avatares);
  }

}
