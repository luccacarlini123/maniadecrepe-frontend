import { Injectable } from "@angular/core";
import { STORAGE_KEY } from "../config/storage-key.config";
import { Cart } from "../models/cart";
import { LocalUser } from "../models/local-user";

@Injectable()
export class StorageService{
    
    getLocalUser() : LocalUser{
        let usr = localStorage.getItem(STORAGE_KEY.localUser);
        if(usr==null){
            return null;
        }else{
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser){
        if(obj==null){
            localStorage.removeItem(STORAGE_KEY.localUser);
        }else{
            localStorage.setItem(STORAGE_KEY.localUser, JSON.stringify(obj));
        }
    }

    getCart() : Cart{
        let cart = localStorage.getItem(STORAGE_KEY.cart);
        if(cart!=null){
            return JSON.parse(cart);
        }else{
            return null;
        }
    }

    setCart(obj : Cart){
        if(obj!=null){
            localStorage.setItem(STORAGE_KEY.cart, JSON.stringify(obj));
        }else{
            localStorage.removeItem(STORAGE_KEY.cart);
        }
    }
}