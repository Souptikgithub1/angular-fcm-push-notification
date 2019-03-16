
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { TopicService } from '../topic-service/topic.service';
import { Topic } from 'src/app/models/topic.model';
import { User } from 'src/app/models/user.model';
import { Utils } from 'src/app/util/utils';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as TopicActions from '../../actions/topic.actions';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireDB: AngularFireDatabase,
              private angularFireAuth: AngularFireAuth,
              private angularFireMessaging: AngularFireMessaging,
              private topicService: TopicService,
              private store: Store<AppState>) {
    this.angularFireMessaging.messaging.subscribe(_messaging => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
    updateToken(userId, token) {
      this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
        const data = {};
        data[userId] = token;
        this.angularFireDB.object('fcmTokens/').update(data);
      });
    }

    /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
   requestPermission(userRes: object) {
     this.angularFireMessaging.requestToken.subscribe(token => {
       console.log(token);
        const topic: Topic = new Topic();
            const user: User = new User();
            user.email = userRes['email'];
            user.name = userRes['name'];
            user.photoUrl = userRes['photoUrl'];
        topic.user = user;
        topic.topicId = token;
        console.log(topic);
       this.topicService.add(topic).subscribe(topicRes => {
        console.log(topicRes);
        localStorage.setItem(Utils.userInfoInLocalStorage, JSON.stringify(topicRes));
        this.store.dispatch(new TopicActions.AddTopic(topicRes));
       });
       this.updateToken(userRes['id'], token);
     },
    err => {
      console.error('Unable to get permission to notify.', err);
     });
   }

   /**
   * hook method when new notification received in foreground
   */
   receiveMessage() {
     this.angularFireMessaging.messages.subscribe(payload => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
     });
   }


}
