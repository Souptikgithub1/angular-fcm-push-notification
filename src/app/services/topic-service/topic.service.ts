import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from 'src/app/util/utils';
import { Topic } from 'src/app/models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private httpClient: HttpClient) { }

  add(user: object) {
    return this.httpClient.post<Topic>(Utils.pushNotiBaseUrl + 'addTopic', user);
  }
}
