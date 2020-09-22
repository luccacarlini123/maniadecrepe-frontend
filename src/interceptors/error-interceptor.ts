import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs";
import { FieldMessage } from "../models/field-message";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService, public alert: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log(errorObj);
                switch (errorObj.status) {
                    case 403:
                        this.handle403();
                        break;

                    case 401:
                        this.handle401();
                            break;

                    case 422:
                        this.handle422(errorObj);
                            break;        

                    default:
                        this.handleDefaultMessage(errorObj);
                }
                return Observable.throw(errorObj);
            }) as any;
    }

    handle422(errorObj) {
        let alert = this.alert.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons:[
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handle401() {
        let alert = this.alert.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]        
        });
        alert.present();
    }

    handle403() {
        this.storageService.setLocalUser(null);
    }

    handleDefaultMessage(errorObj) {
        let alert = this.alert.create({
            title: 'Erro '+ errorObj.status + ': '+ errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    private listErrors(messages: FieldMessage[]): string {
        let s : string = '';
        for(var i=0;i<messages.length;i++){
            s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};