// import { storageService } from '../services/async-storage.service'


const initialState = {
    users: [],
    filterBy: {
        title: '',
        tags: '',
        userId: ''
    },
    page: null
}
export function userReducer(state = initialState, action) {
    var newState = state
    var users
    // var page

    switch (action.type) {
        case 'SET_PAGE':
            newState = { ...state, page: action.page }
            break
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break
        case 'REMOVE_USER':
            const lastRemovedUser = state.users.find(user => user._id === action.userId)
            users = state.users.filter(user => user._id !== action.userId)
            newState = { ...state, users, lastRemovedUser }
            break
        case 'ADD_USER':
            newState = { ...state, users: [...state.users, action.user] }
            break
        case 'UPDATE_USER':
            users = state.users.map(user => (user._id === action.user._id) ? action.user : user)
            newState = { ...state, users }
            break
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy }
        default:
            newState = state


    }
    // For debug:
    // window.userState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
