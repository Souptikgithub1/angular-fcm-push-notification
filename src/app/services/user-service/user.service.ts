import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from 'src/app/util/utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<any[]>(Utils.pushNotiBaseUrl + 'getUsers');
  }
}
