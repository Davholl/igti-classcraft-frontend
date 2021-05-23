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
        console.log("getAvatar", retorno)
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
    var buyhairButton = document.getElementById("buyhair");
    console.log(hairb);
    if (hairb != null && hairf != null && buyhairButton != null) {
      hairb.setAttribute("class", "hairback");
      if (this.state.cabeloState === 4) {
        hairf.setAttribute("class", "hairfront1");
        this.avatarComInventario.avatarVestido.cabelo = 4;
        if (!this.validarSePossuiItem(4)){
          buyhairButton.setAttribute("class", "showHairButton");
        }else {
          buyhairButton.setAttribute("class", "hideHairButton");
        }
      }
      else if (this.state.cabeloState === 5) {
        hairf.setAttribute("class", "hairfront2");
        this.avatarComInventario.avatarVestido.cabelo = 5;
        if (!this.validarSePossuiItem(5)){
          buyhairButton.setAttribute("class", "showHairButton");
        }else {
          buyhairButton.setAttribute("class", "hideHairButton");
        }
      }

      else if (this.state.cabeloState === 6) {
        hairf.setAttribute("class", "hairfront3");
        this.avatarComInventario.avatarVestido.cabelo = 6;
        if (!this.validarSePossuiItem(6)){
          buyhairButton.setAttribute("class", "showHairButton");
        }else {
          buyhairButton.setAttribute("class", "hideHairButton");
        }
      }
    }
  }

  public buyhair(){
    if (this.avatarComInventario){
      this.avatarService.comprarItem(this.avatarComInventario.avatarVestido.avatar.avatarId, this.avatarComInventario.avatarVestido.cabelo).subscribe(
        retorno => {
          this.getAvatar();
        }
      );
    }
  }

  public buydress(){
    if (this.avatarComInventario){
      this.avatarService.comprarItem(this.avatarComInventario.avatarVestido.avatar.avatarId, this.avatarComInventario.avatarVestido.corpo).subscribe(
        retorno => {
          this.getAvatar();
        }
      );
    }
  }

  public buyshoe(){
    if (this.avatarComInventario){
      this.avatarService.comprarItem(this.avatarComInventario.avatarVestido.avatar.avatarId, this.avatarComInventario.avatarVestido.sapato).subscribe(
        retorno => {
          this.getAvatar();
        }
      );
    }
  }

  private updateCorpo() {
    if (!this.avatarComInventario){return;}
    console.log("corpo state:", this.state.corpoState);
    var dress=document.getElementById("clothes");
    var buydressButton = document.getElementById("buydress");
    if (dress != null && buydressButton != null){
      if(this.state.corpoState===1){
        dress.setAttribute("class","dress1");
        this.avatarComInventario.avatarVestido.corpo = 1;
        if (!this.validarSePossuiItem(1)){
          buydressButton.setAttribute("class", "showDressButton");
        }else {
          buydressButton.setAttribute("class", "hideDressButton");
        }
      }
      else
      if(this.state.corpoState===2){
        dress.setAttribute("class","dress2");
        this.avatarComInventario.avatarVestido.corpo = 2;
        if (!this.validarSePossuiItem(2)){
          buydressButton.setAttribute("class", "showDressButton");
        }else {
          buydressButton.setAttribute("class", "hideDressButton");
        }
      }
      else
      if(this.state.corpoState===3){
        dress.setAttribute("class","dress3");
        this.avatarComInventario.avatarVestido.corpo = 3;
        if (!this.validarSePossuiItem(3)){
          buydressButton.setAttribute("class", "showDressButton");
        }else {
          buydressButton.setAttribute("class", "hideDressButton");
        }
      }
    }
  }

  private updateSapato() {
    if (!this.avatarComInventario){return;}
    console.log("sapato state:", this.state.sapatoState);
    var shoe=document.getElementById("shoes");
    var buyshoeButton = document.getElementById("buyshoe");
    if (shoe != null && buyshoeButton != null){
      if(this.state.sapatoState===7){
        shoe.setAttribute("class","shoe1");
        this.avatarComInventario.avatarVestido.sapato = 7;
        if (!this.validarSePossuiItem(7)){
          buyshoeButton.setAttribute("class", "showShoeButton");
        }else {
          buyshoeButton.setAttribute("class", "hideShoeButton");
        }
      }
      else
      if(this.state.sapatoState===8){
        shoe.setAttribute("class","shoe2");
        this.avatarComInventario.avatarVestido.sapato = 8;
        if (!this.validarSePossuiItem(8)){
          buyshoeButton.setAttribute("class", "showShoeButton");
        }else {
          buyshoeButton.setAttribute("class", "hideShoeButton");
        }
      }
      else
      if(this.state.sapatoState===9){
        shoe.setAttribute("class","shoe3");
        this.avatarComInventario.avatarVestido.sapato = 9;
        if (!this.validarSePossuiItem(9)){
          buyshoeButton.setAttribute("class", "showShoeButton");
        }else {
          buyshoeButton.setAttribute("class", "hideShoeButton");
        }
      }
    }
  }

nextdress(): void
{
  if (this.state.corpoState < this.ultimoCorpo){
      this.state.corpoState++;
      this.updateCorpo();
  }else {
    this.state.corpoState = this.primeiroCorpo;
    this.updateCorpo();
  }
}

nextshoe()
{
  if (this.state.sapatoState < this.ultimoSapato){
      this.state.sapatoState++;
      this.updateSapato();
  }else {
    this.state.sapatoState = this.primeiroSapato;
    this.updateSapato();
  }
    
}

nexthair()
{
  if (this.state.cabeloState < this.ultimoCabelo){
      this.state.cabeloState++;
      this.updateCabelo();
  }else {
    this.state.cabeloState = this.primeiroCabelo;
    this.updateCabelo();
  }   
}

validarSePossuiItem(itemId: number){
  return this.avatarComInventario?.itens.includes(itemId);
}

salvarAvatar(){
  console.log(this.avatarComInventario)
  if (this.avatarComInventario != undefined){
    if (this.validarSePossuiItem(this.avatarComInventario.avatarVestido.cabelo)
    && this.validarSePossuiItem(this.avatarComInventario.avatarVestido.corpo)
    && this.validarSePossuiItem(this.avatarComInventario.avatarVestido.sapato)){
      this.avatarService.salvarAvatar(this.avatarComInventario).subscribe(
        retorno => {
        }
      );
    }else {
      alert("Você não pode salvar seu personagem com itens que não comprou")
    }

  }
}

}

