const initialState = {
    userid: 0,
    avatar: '',
    username: '',
    email: '',
    resources: 0,
    contacts: 0,
    meetings: 0,
    resourceCount: 0,
    contactCount: 0,
    meetingCount: 0,
    settingsEditing: false,
    creatingNewResource: false,
    creatingNewContact: false,
    creatingNewNetwork: false,
    resourceList: [],
    resource: {},
    currentResourceID: 0,
    currentResourceTitle: '',
    currentContactID: 0,
    currentContactTitle: '',
    openSettings: false,
    from: '1990-01-01',
    to: '1990-01-01',
    weeks: 1
}

const RESET_USER_ID = 'RESET_USER_ID';
const UPDATE_USER_SETTNGS = 'UPDATE_USER_SETTNGS';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const SETTINGS_DONE_EDITING = 'SETTINGS_DONE_EDITING';
const PREP_RESOURCES = 'PREP_RESOURCES';
const UPDATE_COLLAPSE_STATE = 'UPDATE_COLLAPSE_STATE';
const GET_RESOURCE = 'GET_RESOURCE';
const CREATING_RESOURCE = 'CREATING_RESOURCE';
const CREATING_CONTACT = 'CREATING_CONTACT';
const CREATING_NETWORK = 'CREATING_NETWORK'; 
const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const SET_CURRENT_RESOURCE = 'SET_CURRENT_RESOURCE';
const SET_CURRENT_CONTACT = 'SET_CURRENT_CONTACT';
const SET_RESOURCE_COUNT = 'SET_RESOURCE_COUNT';
const SET_CONTACT_COUNT = 'SET_CONTACT_COUNT';
const SET_MEETING_COUNT = 'SET_MEETING_COUNT';
const SET_SEARCH_RANGE = 'SET_SEARCH_RANGE';



export default function reducer(state = initialState, action ) {

    switch (action.type){

        case UPDATE_USER_SETTNGS:
            let openUserSettings = {openSettings: false};
            if (action.payload.email==='' && action.payload.userid!==0) {
                openUserSettings = {openSettings: true}
            }
            return Object.assign({}, state, action.payload, openUserSettings)

        case RESET_USER_ID:

        return Object.assign({}, state, {userid: 0})

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

        case PREP_RESOURCES:
            let { resourceList } = action.payload
            let oldId = -1;
            let arr = [];
            for (let i=0; i < resourceList.length; i++){
                arr.push(resourceList[i])
                if (oldId !== resourceList[i].id){
                    arr[arr.length-1] = Object.assign(arr[arr.length-1],{main: 'yes', collapse: false})
                }else{
                    arr[arr.length-1] = Object.assign(arr[arr.length-1],{main: 'no', collapse: false})
                }
                oldId = resourceList[i].id
                
            }

            return Object.assign({}, state, {resourceList: arr})

        case UPDATE_COLLAPSE_STATE:
            let resourceId = action.payload;
            let newResourceList = [...state.resourceList];

            newResourceList.forEach( resource => {
                if (resource.id === resourceId){
                    resource.collapse = !resource.collapse
                }
            })

            return Object.assign({}, state, {resourceList: newResourceList})


        case GET_RESOURCE:
            
            let newResource = state.resourceList.filter(resource => resource.id === action.payload)
            
            return Object.assign({}, state, {resource: newResource})

        case CREATING_RESOURCE:
            
            return Object.assign({}, state, {creatingNewResource: action.payload})

        case UPDATE_RESOURCE:

            return Object.assign({}, state, {resource: newResource})

        case CREATING_CONTACT:
            
            return Object.assign({}, state, {creatingNewContact: action.payload})

        case UPDATE_CONTACT:

            return Object.assign({}, state, {contact: action.payload})

        case CREATING_NETWORK:
        
            return Object.assign({}, state, {creatingNewNetwork: action.payload})

        case SET_CURRENT_RESOURCE:

            return Object.assign({}, state, {currentResourceID: action.payload.id, currentResourceTitle: action.payload.title})

        case SET_CURRENT_CONTACT:

            return Object.assign({}, state, {currentContactID: action.payload.id, currentContactTitle: action.payload.title})

        case SET_RESOURCE_COUNT:
        
            return Object.assign({}, state, {resourceCount: action.payload})

        case SET_CONTACT_COUNT:
        
            return Object.assign({}, state, {contactCount: action.payload})

        case SET_MEETING_COUNT:
        
            return Object.assign({}, state, {meetingCount: action.payload})

        case SET_SEARCH_RANGE:
        
            return Object.assign({}, state, {from: action.payload.from, to: action.payload.to, weeks: action.payload.weeks})


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

export function resetUserID(){
    return {
        type: RESET_USER_ID
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

export function prepResources(resourceList){
    return {
        type: PREP_RESOURCES,
        payload: {resourceList: resourceList}
    }
}

export function updateCollapseState (resourceId){
    return {
        type: UPDATE_COLLAPSE_STATE,
        payload: resourceId
    }
}

export function getResource (resourceId) {
    return {
        type: GET_RESOURCE,
        payload: resourceId
    }
}

export function creatingResource (bool) {
    return {
        type: CREATING_RESOURCE,
        payload: bool
    }
}

export function updateResource (resource) {
    return {
        type: UPDATE_RESOURCE,
        payload: resource
    }
}

export function creatingContact (bool) {
    return {
        type: CREATING_CONTACT,
        payload: bool
    }
}

export function updateContact (resource) {
    return {
        type: UPDATE_CONTACT,
        payload: resource
    }
}

export function creatingNetwork (bool) {
    return {
        type: CREATING_NETWORK,
        payload: bool
    }
}

export function setCurrentResource ( resource ) {
    return {
        type: SET_CURRENT_RESOURCE,
        payload: resource
    }
}

export function setCurrentContact ( contact ) {
    return {
        type: SET_CURRENT_CONTACT,
        payload: contact
    }
}

export function setResourceCount( count ) {
    return {
        type: SET_RESOURCE_COUNT,
        payload: count
    }
}

export function setContactCount( count ) {
    return {
        type: SET_CONTACT_COUNT,
        payload: count
    }
}

export function setMeetingCount( count ) {
    return {
        type: SET_MEETING_COUNT,
        payload: count
    }
}

export function setSearchRange(from, to, weeks) {
    return {
        type: SET_SEARCH_RANGE,
        payload: {from: from, to: to, weeks: weeks}
    }
}