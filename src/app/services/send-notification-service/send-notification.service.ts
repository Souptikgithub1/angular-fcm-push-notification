import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from 'src/app/util/utils';

@Injectable({
  providedIn: 'root'
})
export class SendNotificationService {

  constructor(private httpClient: HttpClient) { }
  send(topicBodyList: Array<any>) {
    return this.httpClient.post(Utils.pushNotiBaseUrl + 'send', topicBodyList);
  }
}
