import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { path } from "../config.module";

import "rxjs/add/operator/toPromise";

@Injectable()
export class FavoriteService {
  headers = new Headers({'Content-Type': 'application/json'});
  private basePath:string = path.path;

  constructor(private http:Http) {
  }

  private handleError(error:any):Promise<any> {
    console.error("Ha ocurrido un error.")
    console.log(error)
    return Promise.reject(error.message || error)
  }

  //GET FAVORITOS
  public getAll():Promise<any> {
    let url = `${this.basePath}/favorite/`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

  //GET FAVORITOS
  public getSingle(id:any):Promise<any> {
    let url = `${this.basePath}/favorite/${id}`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

  //GET FAVORITOS
  public getAllUser(id:any):Promise<any> {
    let url = `${this.basePath}/user/${id}/favorite`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

}
