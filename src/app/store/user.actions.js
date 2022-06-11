import { storageService } from '../services/async-storage.service'

const storageKey = 'users'
const apiUrl = 'https://randomuser.me/api/?results=10';


export function loadUsers() {
    return async (dispatch, getState) => {
        try {
            // const { filterBy } = getState().userModule
            let users = await storageService.query(storageKey)
            // console.log('users frome actions ',users);
            if (!users.length) {
                await fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        users = data.results
                        storageService.multiplePost('users', data.results)
                    });
            }
            dispatch({ type: 'SET_USERS', users })
            return users;

        } catch (err) {
            console.log('Cannot load users', err);
        }
    }
}


export function removeUser(userId) {

    return async (dispatch) => {
        try {
            await storageService.remove(storageKey, userId)
            dispatch({ type: 'REMOVE_USER', userId })


        } catch (err) {
            console.log('Cannot remove user', err);
        }
    }
}

export function addUser(userToAdd) {

    return async (dispatch) => {
        try {
            const user = await storageService.post(storageKey, userToAdd)
            dispatch({ type: 'ADD_USER', user })

        } catch (err) {
            console.log('Cannot add user');
        }
    }
}


export function updateUser(userToUpdate) {

    return async (dispatch) => {
        try {
            const user = await storageService.put(storageKey, userToUpdate)
            dispatch({ type: 'UPDATE_USER', user })
        } catch (err) {
            console.log('Cannot update user');
        }
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })

    }
}


export function onSetPage(page) {
    return (dispatch) => {
        dispatch({
            type: 'SET_PAGE',
            page: page
        })
    }
}