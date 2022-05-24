import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  getCookie(c_name:any) {
    let name = c_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
