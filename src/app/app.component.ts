import { Component, OnInit } from '@angular/core';
import { MessagingService } from './services/messaging-service/messaging.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { Utils } from './util/utils';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as TopicActions from './actions/topic.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-fcm-push-notification';
  
  message;

  user: object;

  userInfo = null;

  authServiceSubscription: Subscription;

  constructor(private messagingService: MessagingService,
              private authService: AuthService,
              private store: Store<AppState>) {
                this.store.select('topic').subscribe(res => {
                  if(!res) {
                    const userInLocalStorage = localStorage.getItem(Utils.userInfoInLocalStorage);
                    const userInfo = !!userInLocalStorage ? JSON.parse(userInLocalStorage) : null;
                    if(!!userInfo) {
                      this.store.dispatch(new TopicActions.AddTopic(userInfo));
                      this.userInfo = userInfo;
                    }
                  } else {
                    this.userInfo = res;
                  }

                });
              }

  ngOnInit() {
    //this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  signInWithGoogle() {
    
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
                    .then(user => {
                      console.log(user);
                      this.user = user;
                    })
                    .finally(() => this.messagingService.requestPermission(this.user));
  }

  signOut() {
    this.authService.signOut().then(value => {
      localStorage.removeItem(Utils.userInfoInLocalStorage);
      this.store.dispatch(new TopicActions.AddTopic(null));
    });
  }
}
