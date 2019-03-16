import { Action } from '@ngrx/store';
import { Topic } from '../models/topic.model';


export const ADD_TOPIC = '[TOPIC] Add';

export class AddTopic implements Action {
    readonly type = ADD_TOPIC;
    constructor(public payload: Topic) {}
}

export type Actions = AddTopic;