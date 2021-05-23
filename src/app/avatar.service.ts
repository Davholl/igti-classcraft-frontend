import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AVATARES } from './mock-avatares';
import { catchError, retry } from 'rxjs/operators';
import { Avatar } from './dto/avatar';
import { AvatarVestidoDTO } from './dto/avatar-vestido-dto';
import { AvatarComInventarioDTO } from './dto/avatar-com-inventario-dto';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private baseUrl = 'http://localhost:8080/'
  private avatarUrl = 'avatar';

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  getAvatar(id: number): Observable<AvatarComInventarioDTO> {
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa("admin" + ':' + "password")
    });
    return this.http.get<AvatarComInventarioDTO>(this.baseUrl + this.avatarUrl + '/detalhar/' + id, {headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  salvarAvatar(avatarComInventario: AvatarComInventarioDTO): Observable<AvatarComInventarioDTO>  {
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa("admin" + ':' + "password"),
    });
    console.log(avatarComInventario);
    return this.http.post<AvatarComInventarioDTO>(this.baseUrl + this.avatarUrl + '/salvar', {headers: headers, 
      avatarVestido: avatarComInventario.avatarVestido,
      itens: avatarComInventario.itens
      }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  comprarItem(avatarId: number, equipamentoId: number): Observable<Object>  {
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa("admin" + ':' + "password"),
    });
    console.log(avatarId, equipamentoId);
    return this.http.post<Object>(this.baseUrl + this.avatarUrl + '/comprar', {headers: headers, 
      avatarId: avatarId,
      equipamentoId: equipamentoId
      }).pipe(
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
    console.log(error);
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
