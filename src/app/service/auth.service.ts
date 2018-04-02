import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { path } from "../config.module";

import "rxjs/add/operator/toPromise";

@Injectable()
export class AuthService {
  headers = new Headers({'Content-Type': 'application/json'});
  private basePath:string = path.path;

  constructor(private http:Http) {
  }

  private handleError(error:any):Promise<any> {
    console.error("Ha ocurrido un error.")
    console.log(error)
    return Promise.reject(error.message || error)
  }

  //AUTENTICACIÓN
  public authentication(login:any):Promise<any> {
    let url = `${this.basePath}/login/`
    return this.http.post(url,login)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

}
