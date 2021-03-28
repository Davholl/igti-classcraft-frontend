import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Avatar } from '../dto/avatar'
import { AvatarService } from '../avatar.service';

@Component({
  selector: 'app-avatar-detalhe',
  templateUrl: './avatar-detalhe.component.html',
  styleUrls: ['./avatar-detalhe.component.css']
})
export class AvatarDetalheComponent implements OnInit {

  @Input() avatar?: Avatar;
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
    //Buscar estado atual do personagem e as suas opções de roupa
    //Ter em outra parte da tela, ou em outra tela uma lojinha
}

getAvatar(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.avatarService.getAvatar(Number(id))
      .subscribe(avatar => {
        this.avatar = avatar.avatar
        this.state.corpoState = avatar.corpo;
        this.state.cabeloState = avatar.cabelo;
        this.state.sapatoState = avatar.sapato;
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
    console.log("cabelo state:", this.state.cabeloState);
    var hairf = document.getElementById("hairfront");
    var hairb = document.getElementById("hairback");
    console.log(hairb);
    if (hairb != null && hairf != null) {
      hairb.setAttribute("class", "hairback");
      if (this.state.cabeloState === 4) {
        hairf.setAttribute("class", "hairfront1");
      }

      else if (this.state.cabeloState === 5) {
        hairf.setAttribute("class", "hairfront2");
      }

      else if (this.state.cabeloState === 6) {
        hairf.setAttribute("class", "hairfront3");
      }
    }
  }

  private updateCorpo() {
    console.log("crpo state:", this.state.corpoState);
    var dress=document.getElementById("clothes");
    if (dress != null){
      if(this.state.corpoState===1){
        dress.setAttribute("class","dress1");
      }
      else
      if(this.state.corpoState===2){
        dress.setAttribute("class","dress2");
      }
      else
      if(this.state.corpoState===3){
        dress.setAttribute("class","dress3");
      }
    }
  }

  private updateSapato() {
    console.log("sapato state:", this.state.sapatoState);
    var shoe=document.getElementById("shoes");
    if (shoe != null){
      if(this.state.sapatoState===7){
        shoe.setAttribute("class","shoe1");
      }
      else
      if(this.state.sapatoState===8){
        shoe.setAttribute("class","shoe2");
      }
      else
      if(this.state.sapatoState===9){
        shoe.setAttribute("class","shoe3");
      }
  }
  }

nextdress(): void
{
    console.log("inside function nextdress");
    console.log(this.state.corpoState);
    var dress=document.getElementById("clothes");
    if (dress != null){
      if(this.state.corpoState===1){
      dress.setAttribute("class","dress1");
      this.state.corpoState++;
          console.log(this.state.corpoState);
      }
      else
      if(this.state.corpoState===2){
      dress.setAttribute("class","dress2");
          this.state.corpoState++;
          console.log(this.state.corpoState);
      }
      else
      if(this.state.corpoState===3){
      dress.setAttribute("class","dress3");
          this.state.corpoState=1;
      }
  }
    
}

nextshoe()
{
    console.log("inside function nextshoe");
    console.log(this.state.sapatoState);
    var shoe=document.getElementById("shoes");
    if (shoe != null){
      if(this.state.sapatoState===7){
        shoe.setAttribute("class","shoe1");
        this.state.sapatoState++;
          console.log(this.state.sapatoState);
      }
      else
      if(this.state.sapatoState===8){
      shoe.setAttribute("class","shoe2");
          this.state.sapatoState++;
          console.log(this.state.sapatoState);
      }
      else
      if(this.state.sapatoState===9){
      shoe.setAttribute("class","shoe3");
          this.state.sapatoState=7;
      }
  }
    
}

nexthair()
{
    console.log("inside function nexthair");
    
    console.log(this.state.cabeloState);
    var hairf=document.getElementById("hairfront");
    var hairb=document.getElementById("hairback");
    if (hairb != null && hairf != null){
      hairb.setAttribute("class","hairback");
      
      if(this.state.cabeloState===4){
      hairf.setAttribute("class","hairfront1");
          this.state.cabeloState++;
          console.log(this.state.cabeloState);
      }
      else
      if(this.state.cabeloState===5){
      hairf.setAttribute("class","hairfront2");
         this.state.cabeloState++;
          console.log(this.state.cabeloState);
      }
      else
      if(this.state.cabeloState===6){
      hairf.setAttribute("class","hairfront3");
         this.state.cabeloState=4;
      }
  }
    
}

}

