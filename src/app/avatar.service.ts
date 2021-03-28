import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AVATARES } from './mock-avatares';
import { catchError, retry } from 'rxjs/operators';
import { Avatar } from './dto/avatar';
import { AvatarVestidoDTO } from './dto/avatar-vestido-dto';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private baseUrl = 'http://localhost:8080/'
  private avatarUrl = 'avatar';

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  getAvatar(id: number): Observable<AvatarVestidoDTO> {
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa("admin" + ':' + "password")
    });
    return this.http.get<AvatarVestidoDTO>(this.baseUrl + this.avatarUrl + '/detalhar/' + id, {headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAvatares():Observable<Avatar[]> {

    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa("admin" + ':' + "password")
    });
    this.log('buscando avatares');
    return this.http.get<Avatar[]>(this.baseUrl + this.avatarUrl + '/listar', {headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error: { error: { message: any; }; status: any; message: any; }) {

    let errorMessage = '';
 
    if (error.error instanceof ErrorEvent) {
 
      // client-side error
 
      errorMessage = `Error: ${error.error.message}`;
 
    } else {
 
      // server-side error
 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
 
    }
 
    window.alert(errorMessage);
 
    return throwError(errorMessage);
 
  }

  private log(message: string) {
    this.messageService.add(`AvatarService: ${message}`);
  }

}
