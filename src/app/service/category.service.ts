import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { path } from "../config.module";

import "rxjs/add/operator/toPromise";

@Injectable()
export class CategoryService {
  headers = new Headers({'Content-Type': 'application/json'});
  private basePath:string = path.path;

  constructor(private http:Http) {
  }

  private handleError(error:any):Promise<any> {
    console.error("Ha ocurrido un error.")
    console.log(error)
    return Promise.reject(error.message || error)
  }

  //GET CATEGORIA
  public getAll():Promise<any> {
    let url = `${this.basePath}/category/`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

  //GET CATEGORIA
  public getAllSubCategoryProduct(id:any):Promise<any> {
    let url = `${this.basePath}/subcategory/${id}/product`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

  //GET CATEGORIA
  public getAllSubCategorias(id:any):Promise<any> {
    let url = `${this.basePath}/category/${id}/subcategory`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

  //GET CATEGORIA
  public getAllProducts(id:any):Promise<any> {
    let url = `${this.basePath}/category/${id}/product`
    return this.http.get(url)
    .toPromise()
      .then(response => {
        return response.json()
      })
    .catch(this.handleError)
  }

}
