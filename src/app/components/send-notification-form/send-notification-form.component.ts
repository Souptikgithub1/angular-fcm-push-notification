import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { SendNotificationService } from 'src/app/services/send-notification-service/send-notification.service';

@Component({
  selector: 'app-send-notification-form',
  templateUrl: './send-notification-form.component.html',
  styleUrls: ['./send-notification-form.component.css']
})
export class SendNotificationFormComponent implements OnInit {

  notiTitle: string = '';
  body: string = '';
  selectedTopics: string[] = [];


  users: Array<any>;

  constructor(private userService: UserService,
              private sendNotificationService: SendNotificationService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  handleSubmit() {
    let topicBodyList = [];
    for(let selectedTopic of this.selectedTopics) {
        topicBodyList.push({title: this.notiTitle, body: this.body, topicId: selectedTopic});
    }
    console.log(topicBodyList);
    this.sendNotificationService.send(topicBodyList).subscribe(res => {
      console.log();
    });
  }

  selectTopic(topic) {
    this.selectedTopics = [topic];
  }

  selectUser(user) {
    for(let topic of user['topics']) {
      this.selectedTopics.push(topic['topicId']);
    }
  }
}
