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

export default function reducer(state = initialState, action ) {

    switch (action.type){

        case UPDATE_USER_SETTNGS:
            return Object.assign({}, state, action.payload)

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