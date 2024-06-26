import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  constructor() { }

  private tokenKey:string = 'app_token';

  private store(content:Object) {
      localStorage.setItem(this.tokenKey, JSON.stringify(content));
  }

  private retrieve() {
      let storedToken = localStorage.getItem(this.tokenKey);
      if(!storedToken) throw 'no token found';
      return storedToken;
  }

  public generateNewToken() {
      let token:string = '...';;
      let currentTime:number = (new Date()).getTime();
      this.store({ttl: currentTime, token});
  }

  public retrieveToken() {

      let currentTime:number = (new Date()).getTime(), token = null;
      try {
          let storedToken = JSON.parse(this.retrieve());
          if(storedToken.ttl < currentTime) throw 'invalid token found';
          token = storedToken.token;
      }
      catch(err) {
          console.error(err);
      }
      return token;

  }
}
