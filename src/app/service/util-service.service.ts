import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { LocalStorageService } from "angular-2-local-storage";
import {ENDPOINT} from "src/app/urls/endpoints";


@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {
  token: any;
  URL = ENDPOINT;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: LocalStorageService
  ) {
    this.token = localStorage.getItem("token");
  }

  createAuthHeader(headers: HttpHeaders) {
    headers = headers.append("x-access-token", `${this.token}`);
    return headers;

  }

  login(endpoint: string, param: any) {
    let headers = new HttpHeaders();
    console.log(headers);

    return this.http.post(endpoint, param, {
      headers,
      observe: "response"
    });
  }

  httpPost(endpoint: string, param: any, requireToken = true,) {
    let headers = new HttpHeaders();
    if (requireToken) {
      headers = this.createAuthHeader(headers);
    }
    return this.http.post(endpoint, param, {
      headers,
      observe: "response"
    });
  }

  httpGet(endpoint: string, param: any, requireToken = true) {
    let headers = new HttpHeaders();

    if (requireToken) {
      headers = this.createAuthHeader(headers);
    }
    const routeParam = param ? endpoint + param : endpoint;
    return this.http.get(routeParam, { headers, observe: "response" });
  }

  httpPut(endpoint: string, param: any) {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.put(endpoint, param, { headers, observe: "response" });
  }

  httpDelete(endpoint: string, param: any, requireToken = true) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    if (requireToken) {
      headers = this.createAuthHeader(headers);
    }
    const routeParam = param ? endpoint + param : endpoint;
    return this.http.delete(routeParam, { headers, observe: "response" });
  }

  //implementar CRUD com x-access-token

  setStorage(parameter: string, value: any) {
    this.storage.set(parameter, value);
  }

  getStorage(parameter: string): any {
    return this.storage.get(parameter);
  }

  removeStorage(parameter: string) {
    this.storage.remove(parameter);
  }

  clearStorage() {
    this.storage.clearAll();
  }

  navigate(route: string, param: any) {
    this.router.navigate([`/${route}`, param ? param : {}]);
  }

}
