import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Avatar } from './avatar';
import { MessageService } from './message.service';
import { AVATARES } from './mock-avatares';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  getAvatar(id: number): Observable<Avatar> {
    const avatar = AVATARES.find(h => h.avatarId === id) as Avatar;
    this.messageService.add(`AvatarService: buscou avatar id=${id}`);
    return of(avatar);
  }

  constructor(private messageService: MessageService) { }

  getAvatares():Observable<Avatar[]> {
    var avatares = of(AVATARES);
    this.messageService.add('AvatarService: buscou avatares');
    return avatares;
  }

}
