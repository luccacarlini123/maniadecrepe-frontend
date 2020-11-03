import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecoService } from '../../services/domain/endereco-service';

@IonicPage()
@Component({
  selector: 'page-enderecos',
  templateUrl: 'enderecos.html',
})
export class EnderecosPage {

  enderecos: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public enderecoService: EnderecoService) {
  }

  ionViewWillEnter() {
    this.enderecoService.findEnderecoByCliente()
      .subscribe(response => {
        this.enderecos = response;
      },
      error =>{});
  }

  nextPage(endereco: EnderecoDTO){
    this.navCtrl.push('EnderecoDetailPage', {endereco: endereco});
  }
}