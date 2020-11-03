import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { EnderecoService } from '../../services/domain/endereco-service';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-endereco-detail',
  templateUrl: 'endereco-detail.html',
})
export class EnderecoDetailPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  endereco: EnderecoDTO;
  id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public estadoService: EstadoService,
    public cidadeService: CidadeService, public enderecoService: EnderecoService, public alert: AlertController) {
    this.formGroup = this.formBuilder.group({
      id: [''],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', []],
      bairro: ['', []],
      cep: ['', [Validators.required]],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    if (this.navParams.get('endereco')) {
      this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.updateCidades();
      },
        error => { });
      this.loadData();
    }else{
      this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
        error => { });
    }
  }

  loadData() {
    this.endereco = this.navParams.get('endereco');
    this.id = this.endereco.id;
    this.formGroup.controls.id.setValue(this.endereco.id);
    this.formGroup.controls.logradouro.setValue(this.endereco.logradouro);
    this.formGroup.controls.numero.setValue(this.endereco.numero);
    this.formGroup.controls.complemento.setValue(this.endereco.complemento);
    this.formGroup.controls.bairro.setValue(this.endereco.bairro);
    this.formGroup.controls.cep.setValue(this.endereco.cep);
    this.formGroup.controls.estadoId.setValue(this.endereco.cidade.estado.id);
    this.formGroup.controls.cidadeId.setValue(this.endereco.cidade.id);
  }

  onSubmit() {
    if(this.id!=null){
    this.enderecoService.update(this.formGroup.value)
      .subscribe(response => {
        this.showAlertOk('Sucesso!', 'Atualização efetuada com sucesso');
      })
    }
    if(this.id==null){
      this.enderecoService.insert(this.formGroup.value)
        .subscribe(response => {
          this.showAlertOk('Sucesso!', 'Endereço cadastrado com sucesso');
        })
    }
  }

  showAlertOk(title:string, message:string) {
    let alert = this.alert.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    })
    alert.present();
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
      },
        error => { });
  }

}