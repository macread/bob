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
            var { avatar, username, email, resources, contacts, meetings } = action.payload;
            return Object.assign({}, state, { avatar: avatar, username: username, email: email, resources: resources, contacts: contacts, meetings: meetings })

        default:
        return state;
    }

}

export function updateUserSettings(userid, avatar, username, email, resources, contacts, meetings){
    return {
        type: UPDATE_USER_SETTNGS,
        payload: { userid: userid, avatar: avatar, username: username, email: email, resources: resources, contacts: contacts, meetings: meetings }
    }
}