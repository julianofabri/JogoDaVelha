import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  imagem:string = '';

  public p1_nome:string = 'Player 1';
  public p2_nome:string = 'Player 2';
  public foto1: string = 'vazio';
  public foto2: string = 'vazio';

  constructor(private camera: Camera, private storage: Storage) {

    this.storage.get('p1_nome').then((val) => {

      if(val == null) {

        this.storage.set('p1_nome','Player 1');
        this.p1_nome = 'Player 1';

      } else {

        this.p1_nome = val;

      }

    });
    
    this.storage.get('p2_nome').then((val) => {

      if(val == null) {

        this.storage.set('p2_nome','Player 2');
        this.p2_nome = 'Player 2';

      } else {

        this.p2_nome = val;

      }

    });

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
    

  }

  tirarfoto(player: string) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE 
    }

    this.camera.getPicture(options).then((imageData) => {

      this.imagem = 'data:image/jpeg;base64,' + imageData;

      if(player == 'p1') {
      
        this.foto1 = this.imagem;
        this.storage.set('p1_img', this.imagem);

      }

      if(player == 'p2') {
      
        this.foto2 = this.imagem; 
        this.storage.set('p2_img', this.imagem);

      }
      

     }, (err) => { }
     
     );
  
  }

  alterarNome(val2, player: string) {

      // this.imagem = 'data:image/jpeg;base64,' + imageData;
      this.storage.set(player + '_nome', val2);

      this.storage.get(player + '_nome').then((val) => {

      })

  
  }

}
