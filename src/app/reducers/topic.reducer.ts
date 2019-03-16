import { Topic } from '../models/topic.model';
import * as TopicActions from '../actions/topic.actions';

const initState: Topic = null;

export function topicReducer(state: Topic = initState, action: TopicActions.Actions) {

    switch(action.type) {
        case TopicActions.ADD_TOPIC:
            state = action.payload;
            return state;

        default:
            return state;
    }
}
