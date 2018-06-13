const initialState = {
    userid: 0,
    avatar: '',
    username: '',
    email: '',
    resources: 0,
    contacts: 0,
    meetings: 0
}

const UPDATE_USER_SETTNGS = 'UPDATE_USER_SETTNGS';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export default function reducer(state = initialState, action ) {

    switch (action.type){

        case UPDATE_USER_SETTNGS:
            return Object.assign({}, state, action.payload)

        case UPDATE_EMAIL:
            return Object.assign({}, state, { email: action.payload })

        case INCREMENT:
            switch (action.payload){
                case 'resource':
                    return Object.assign({}, state, {resources: ++state.resources});
                case 'contact':
                    return Object.assign({}, state, {contacts: ++state.contacts});
                case 'meeting':
                    return Object.assign({}, state, {meetings: ++state.meetings});    
                default:
                    break;
            }
            break;

        case DECREMENT:
            switch (action.payload){
                case 'resource':
                    return Object.assign({}, state, {resources: --state.resources});
                case 'contact':
                    return Object.assign({}, state, {contacts: --state.contacts});
                case 'meeting':
                    return Object.assign({}, state, {meetings: --state.meetings});    
                default:
                    break;
            }
            break;

        default:
        return state;
    }

}

export function updateUserSettings(user){
    return {
        type: UPDATE_USER_SETTNGS,
        payload: user
    }
}

export function updateEmail(val){
    return {
        type: UPDATE_EMAIL,
        payload: val
    }
}

export function increment(goalType){
    return {
        type: INCREMENT,
        payload: goalType
    }
}

export function decrement(goalType){
    return {
        type: DECREMENT,
        payload: goalType
    }
}