import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LineToLineMappedSource } from 'webpack-sources';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public spaces: string[][] = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

  public player1: string = 'Player 1';
  public player2: string = 'Player 2';
  public foto1: string = 'vazio';
  public foto2: string = 'vazio';

  public finish: boolean = false;

  matrizPreechida: boolean = false;

  public player1symbol: string;
  public player2symbol: string;

  public winner: string;

  public value: number;
  
  constructor(private storage: Storage, private screenOrientation: ScreenOrientation) {
    
    this.value = Math.floor((Math.random() * 2) + 1);

    if(this.value == 1)
    {
      this.player1symbol = 'X';
      this.player2symbol = 'O'
    }
    else
    {
      this.player1symbol = 'O';
      this.player2symbol = 'X';      
    }

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  

  ionViewWillEnter() {

    this.storage.get('p1_img').then((val) => {

      if(val == null) {

        this.storage.set('p1_img','https://www.elections.tn.gov.in/member/noimg.svg');
        this.foto1 = 'https://www.elections.tn.gov.in/member/noimg.svg';

      } else {

        this.foto1 = val;

      }

    });
    
    this.storage.get('p2_img').then((val) => {

      if(val === null) {

        this.storage.set('p2_img','https://www.elections.tn.gov.in/member/noimg.svg');
        this.foto2 = 'https://www.elections.tn.gov.in/member/noimg.svg';

      } else {

        this.foto2 = val;

      }

    });

    this.storage.get('p1_nome').then((val) => {

      if(val === null) {

        this.storage.set('p1_nome','Player 1');
        this.player1 = 'Player 1';

      } else {

        this.player1 = val;

      }

    });

    this.storage.get('p2_nome').then((val) => {

      if(val === null) {

        this.storage.set('p2_nome','Player 2');
        this.player2 = 'Player 2';

      } else {

        this.player2 = val;

      }

    });

  }

  onClick(id: string) {

    let position: string[];

    position = id.split('-');

    if(this.spaces[position[0]][position[1]] == ' '){
      if(this.value == 1){
  
        this.spaces[position[0]][position[1]] = 'X';
        this.value = 0;
        if(this.verificaMatriz('X') == 'X'){
          if(this.player1symbol == 'X'){
            this.storage.get('p1_nome').then((val) => {
  
              if(val === null) {
        
                this.storage.set('p1_nome','Player 1');
                this.winner = 'Player 1';
        
              } else {
        
                this.winner = val;
        
              }
        
            });
  
          }
          else{
            this.storage.get('p2_nome').then((val) => {
  
              if(val === null) {
        
                this.storage.set('p2_nome','Player 2');
                this.winner = 'Player 2';
        
              } else {
        
                this.winner = val;
        
              }
        
            });
          }
          this.finish = true;
        }
  
      }
      else{
  
        this.spaces[position[0]][position[1]] = 'O';
        this.value = 1;
        if(this.verificaMatriz('O') == 'O'){
          if(this.player1symbol == 'O'){
            this.storage.get('p1_nome').then((val) => {
  
              if(val === null) {
        
                this.storage.set('p1_nome','Player 1');
                this.winner = 'Player 1';
        
              } else {
        
                this.winner = val;
        
              }
        
            });
          }
          else{
            this.storage.get('p2_nome').then((val) => {
  
              if(val === null) {
        
                this.storage.set('p2_nome','Player 2');
                this.winner = 'Player 2';
        
              } else {
        
                this.winner = val;
        
              }
        
            });
          }
          this.finish = true;
        }
  
      }
    }
  }

  verificaMatrizPreenchida() {
    this.matrizPreechida = true;
    this.spaces.forEach((element, key) => {
        element.forEach(element => {
            if (element === null) {
                this.matrizPreechida = false;
            }
        });
    });
    return this.matrizPreechida;
  }

  verificaMatriz(simbolo: string) {

    if (this.spaces[0][0] == simbolo && this.spaces[0][1] == simbolo && this.spaces[0][2] == simbolo)
        return simbolo;

    if (this.spaces[1][0] == simbolo && this.spaces[1][1] == simbolo && this.spaces[1][2] == simbolo)
        return simbolo;

    if (this.spaces[2][0] == simbolo && this.spaces[2][1] == simbolo && this.spaces[2][2] == simbolo)
        return simbolo;

    if (this.spaces[0][0] == simbolo && this.spaces[1][1] == simbolo && this.spaces[2][2] == simbolo)
        return simbolo;

    if (this.spaces[2][0] == simbolo && this.spaces[1][1] == simbolo && this.spaces[0][2] == simbolo)
        return simbolo;

    if (this.spaces[0][0] == simbolo && this.spaces[1][0] == simbolo && this.spaces[2][0] == simbolo)
        return simbolo;

    if (this.spaces[0][1] == simbolo && this.spaces[1][1] == simbolo && this.spaces[2][1] == simbolo)
        return simbolo;

    if (this.spaces[0][2] == simbolo && this.spaces[1][2] == simbolo && this.spaces[2][2] == simbolo)
        return simbolo;

    return false;

  }

  restartGame(){
    this.spaces[0][0] = ' ';
    this.spaces[0][1] = ' ';
    this.spaces[0][2] = ' ';    
    
    this.spaces[1][0] = ' ';    
    this.spaces[1][1] = ' ';    
    this.spaces[1][2] = ' ';    
    
    this.spaces[2][0] = ' ';    
    this.spaces[2][1] = ' ';    
    this.spaces[2][2] = ' ';  
    
    this.finish = false;

    this.value = Math.floor((Math.random() * 2) + 1);

    if(this.value == 1)
    {
      this.player1symbol = 'X';
      this.player2symbol = 'O'
    }
    else
    {
      this.player1symbol = 'O';
      this.player2symbol = 'X';      
    }

  }

}
