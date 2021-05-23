import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Avatar } from '../dto/avatar'
import { AvatarService } from '../avatar.service';
import { AvatarComInventarioDTO } from '../dto/avatar-com-inventario-dto';

@Component({
  selector: 'app-avatar-detalhe',
  templateUrl: './avatar-detalhe.component.html',
  styleUrls: ['./avatar-detalhe.component.css']
})
export class AvatarDetalheComponent implements OnInit {

  primeiroCorpo: number = 1;
  ultimoCorpo: number = 3;

  primeiroCabelo: number = 4;
  ultimoCabelo: number = 6;

  primeiroSapato: number = 7;
  ultimoSapato: number = 9;

  @Input() avatar?: Avatar;
  avatarComInventario :AvatarComInventarioDTO | undefined;
  constructor(
    private route: ActivatedRoute,
    private avatarService: AvatarService,
    private location: Location
  ) { }
  title = 'igti-frontend';

ngOnInit()
{
  console.log("ngInit");
  this.state.corpoState=1;
  this.state.sapatoState=1;
  this.state.cabeloState=1;
  //Buscar estado atual do personagem e as suas opções de roupa
  //Ter em outra parte da tela, ou em outra tela uma lojinha
}



ngAfterViewInit()
{
  console.log("ngAfterViewInit");
  this.getAvatar();
  // Buscar estado atual do personagem e as suas opções de roupa
  // Ter em outra parte da tela, ou em outra tela uma lojinha
}

getAvatar(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.avatarService.getAvatar(Number(id))
      .subscribe(retorno => {
        console.log(retorno)
        this.avatarComInventario = retorno;
        this.avatar = retorno.avatarVestido.avatar
        this.state.corpoState = retorno.avatarVestido.corpo;
        this.state.cabeloState = retorno.avatarVestido.cabelo;
        this.state.sapatoState = retorno.avatarVestido.sapato;
        setTimeout(()=>{                           //<<<---using ()=> syntax
          this.updateAvatar();
        }, 100);
      });
}

retornar(){
  this.location.back();
}

state = {
    corpoState : 0,
    sapatoState:0,
    cabeloState:0
};

updateAvatar(): void {    
    this.updateCabelo();
    this.updateCorpo();
    this.updateSapato();
}

  private updateCabelo() {
    if (!this.avatarComInventario){return;}
    console.log("cabelo state:", this.state.cabeloState);
    var hairf = document.getElementById("hairfront");
    var hairb = document.getElementById("hairback");
    console.log(hairb);
    if (hairb != null && hairf != null) {
      hairb.setAttribute("class", "hairback");
      if (this.state.cabeloState === 4 && this.validarSePossuiItem(4)) {
        hairf.setAttribute("class", "hairfront1");
        this.avatarComInventario.avatarVestido.sapato = 4;
      }

      else if (this.state.cabeloState === 5 && this.validarSePossuiItem(5)) {
        hairf.setAttribute("class", "hairfront2");
        this.avatarComInventario.avatarVestido.sapato = 5;
      }

      else if (this.state.cabeloState === 6 && this.validarSePossuiItem(6)) {
        hairf.setAttribute("class", "hairfront3");
        this.avatarComInventario.avatarVestido.sapato = 6;
      }
    }
  }

  private updateCorpo() {
    if (!this.avatarComInventario){return;}
    console.log("corpo state:", this.state.corpoState);
    var dress=document.getElementById("clothes");
    if (dress != null){
      if(this.state.corpoState===1 && this.validarSePossuiItem(1)){
        dress.setAttribute("class","dress1");
        this.avatarComInventario.avatarVestido.corpo = 1;
      }
      else
      if(this.state.corpoState===2 && this.validarSePossuiItem(2)){
        dress.setAttribute("class","dress2");
        this.avatarComInventario.avatarVestido.corpo = 2;
      }
      else
      if(this.state.corpoState===3 && this.validarSePossuiItem(3)){
        dress.setAttribute("class","dress3");
        this.avatarComInventario.avatarVestido.corpo = 3;
      }
    }
  }

  private updateSapato() {
    if (!this.avatarComInventario){return;}
    console.log("sapato state:", this.state.sapatoState);
    var shoe=document.getElementById("shoes");
    if (shoe != null){
      if(this.state.sapatoState===7 && this.validarSePossuiItem(7)){
        shoe.setAttribute("class","shoe1");
        this.avatarComInventario.avatarVestido.sapato = 7;
      }
      else
      if(this.state.sapatoState===8 && this.validarSePossuiItem(8)){
        shoe.setAttribute("class","shoe2");
        this.avatarComInventario.avatarVestido.sapato = 8;
      }
      else
      if(this.state.sapatoState===9 && this.validarSePossuiItem(9)){
        shoe.setAttribute("class","shoe3");
        this.avatarComInventario.avatarVestido.sapato = 9;
      }
    }
  }

nextdress(): void
{
  if (this.state.corpoState < this.ultimoCorpo){
    if (this.validarSePossuiItem(this.state.corpoState + 1)){
      this.state.corpoState++;
      this.updateCorpo();
    }else{
      this.state.corpoState++;
      this.nextdress();
    }
  }else {
    this.state.corpoState = this.primeiroCorpo;
    this.updateCorpo();
  }
}

nextshoe()
{
  if (this.state.sapatoState < this.ultimoSapato){
    if (this.validarSePossuiItem(this.state.sapatoState + 1)){
      this.state.sapatoState++;
      this.updateSapato();
    }else{
      this.state.sapatoState++;
      this.nextshoe();
    }
  }else {
    this.state.sapatoState = this.primeiroSapato;
    this.updateSapato();
  }
    
}

nexthair()
{
  if (this.state.cabeloState < this.ultimoCabelo){
    if (this.validarSePossuiItem(this.state.cabeloState + 1)){
      this.state.cabeloState++;
      this.updateCabelo();
    }else{
      this.state.cabeloState++;
      this.nexthair();
    }
  }else {
    this.state.cabeloState = this.primeiroCabelo;
    this.updateCabelo();
  }   
}

validarSePossuiItem(itemId: number){
  return this.avatarComInventario?.itens.includes(itemId);
}

salvarAvatar(){
  if (this.avatarComInventario != undefined){
    this.avatarService.salvarAvatar(this.avatarComInventario).subscribe(
      retorno => {
        
      }
    );
  }
}

}

