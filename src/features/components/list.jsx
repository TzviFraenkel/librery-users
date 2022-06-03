import React, { useEffect, useState } from 'react';

import { UserPreview } from './userPreview';
import { storageService } from '../../app/services/async-storage.service';
import { EditUser } from './editUser';


export function UsersList() {

    const url = 'https://randomuser.me/api/?results=10';

    const [list, setList] = useState([])
    const [isList, setIsList] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [isAddNewUser, setAddNewUser] = useState(false)
    const [userToEdit, setUserToEdit] = useState({})

    let getUsers = async () => {
        try {
            let res = await storageService.query('users')
            if (!res.length) usersFromApi()
            else setList(res)
        } catch (err) {
            console.log(err);
        }
        // console.log(list);
    };

    const usersFromApi = async () => {
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setList(data.results)
                storageService.multiplePost('users', data.results)
            });
    }

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        setIsList(list.length ? true : false)
    }, [list])

    const onToggleEdit = (userToEdit = {}, isAddNewUser = false) => {
        setUserToEdit(userToEdit)
        setToggleEdit(!toggleEdit)
        setAddNewUser(isAddNewUser)
    }

    const removeUser = (userId) => {
        storageService.remove('users', userId)
        setList(list.filter(user => user._id !== userId))
    }

    const onAddNewUser = (newUser) =>{
        storageService.post('users', newUser)
        setList([...list, newUser])
    }

    const onEditUser = (editedUser) => {
        storageService.put('users', editedUser)
        setList(list.map(user => (user._id === editedUser._id) ? editedUser : user))
    }


    return (
        <div className='users-list-background'>
            <h1 className='haeder'>Librery Users</h1>
            {isList &&
                <section className='usersList'>
                    <div className="add-section">
                    <button className="add-user" onClick={() => onToggleEdit({},true)}>Add new User</button>
                    </div>
                    {list.map((user, idx) => <UserPreview user={user} removeUser={removeUser} key={idx} toggleEdit={onToggleEdit} />)}
                </section>
            }
            {!isList && <h1>Loding...</h1>}
            {toggleEdit && <EditUser isAddNewUser={isAddNewUser} user={userToEdit} toggleEdit={onToggleEdit} onEditUser={onEditUser} onAddNewUser={onAddNewUser}/>}
        </div>
    )
}