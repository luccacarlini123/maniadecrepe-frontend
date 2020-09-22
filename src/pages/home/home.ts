import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController, public authService: AuthService, public storage: StorageService) {
  }

  login(){
    this.authService.authenticate(this.creds)
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      }, 
      error => {});
    
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidEnter(){
    let user = this.storage.getLocalUser();
    if(user){
    this.authService.refreshToken()
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      })
    }
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

}
