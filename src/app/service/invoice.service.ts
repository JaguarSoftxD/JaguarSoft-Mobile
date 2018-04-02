import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { path } from "../config.module";

import "rxjs/add/operator/toPromise";

@Injectable()
export class InvoiceService {
  headers = new Headers({'Content-Type': 'application/json'});
  private basePath:string = path.path;

  constructor(private http:Http) {
  }

  private handleError(error:any):Promise<any> {
    console.error("Ha ocurrido un error.")
    console.log(error)
    return Promise.reject(error.message || error)
  }

  //GET FACTURAS
  public getAll():Promise<any> {
    let url = `${this.basePath}/invoice`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

  //GET FACTURAS
  public getSingle(id:any):Promise<any> {
    let url = `${this.basePath}/invoice/${id}`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

  //CREATE FACTURAS
  public create(invoice:any):Promise<any> {
    let url = `${this.basePath}/invoice`
    return this.http.post(url, invoice)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

  //GET FACTURAS LINEAS
  public getLines(id:any):Promise<any> {
    let url = `${this.basePath}/invoice/${id}/lines`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

  //GET FACTURAS
  public getAllUser(id:any):Promise<any> {
    let url = `${this.basePath}/user/${id}/invoice`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

}
