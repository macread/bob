const initialState = {
    userid: 0,
    avatar: '',
    username: '',
    email: '',
    resources: 0,
    contacts: 0,
    meetings: 0,
    settingsEditing: false
}

const UPDATE_USER_SETTNGS = 'UPDATE_USER_SETTNGS';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const SETTINGS_DONE_EDITING = 'SETTINGS_DONE_EDITING';

export default function reducer(state = initialState, action ) {

    switch (action.type){

        case UPDATE_USER_SETTNGS:
            return Object.assign({}, state, action.payload)

        case UPDATE_EMAIL:
            return Object.assign({}, state, { email: action.payload, settingsEditing: true })

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

        case SETTINGS_DONE_EDITING:
            return Object.assign({}, state, {settingsEditing: false});

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

export function settingsDoneEditing(){
    return {
        type: SETTINGS_DONE_EDITING
    }
}