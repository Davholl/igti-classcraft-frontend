import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'igti-frontend';

ngOnInit()
{

    //Buscar estado atual do personagem e as suas opções de roupa
    //Ter em outra parte da tela, ou em outra tela uma lojinha
    
    console.log("window has loaded");
    this.state.i=1;
    this.state.j=1;
    this.state.k=1;
    
}

state = {
    i : 0,
    j:0,
    k:0
};

nextdress(): void
{
    console.log("inside function nextdress");
    console.log(this.state.i);
    var dress=document.getElementById("clothes");
    if (dress != null){
      if(this.state.i===0){
      dress.setAttribute("class","dress1");
      this.state.i++;
          console.log(this.state.i);
      }
      else
      if(this.state.i===1){
      dress.setAttribute("class","dress2");
          this.state.i++;
          console.log(this.state.i);
      }
      else
      if(this.state.i===2){
      dress.setAttribute("class","dress3");
          this.state.i=0;
      }
  }
    
}

nextshoe()
{
    console.log("inside function nextshoe");
    console.log(this.state.j);
    var shoe=document.getElementById("shoes");
    if (shoe != null){
      if(this.state.j===0){
        shoe.setAttribute("class","shoe1");
        this.state.j++;
          console.log(this.state.j);
      }
      else
      if(this.state.j===1){
      shoe.setAttribute("class","shoe2");
          this.state.j++;
          console.log(this.state.j);
      }
      else
      if(this.state.j===2){
      shoe.setAttribute("class","shoe3");
          this.state.j=0;
      }
  }
    
}

nexthair()
{
    console.log("inside function nexthair");
    
    console.log(this.state.k);
    var hairf=document.getElementById("hairfront");
    var hairb=document.getElementById("hairback");
    if (hairb != null && hairf != null){
      hairb.setAttribute("class","hairback");
      
      if(this.state.k===0){
      hairf.setAttribute("class","hairfront1");
          this.state.k++;
          console.log(this.state.k);
      }
      else
      if(this.state.k===1){
      hairf.setAttribute("class","hairfront2");
         this.state.k++;
          console.log(this.state.k);
      }
      else
      if(this.state.k===2){
      hairf.setAttribute("class","hairfront3");
         this.state.k=0;
      }
  }
    
}

}
