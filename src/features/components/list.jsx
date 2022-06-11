import React, { useEffect, useState } from 'react';
import { connect } from "react-redux"


import { UserPreview } from './userPreview';
import { EditUser } from './editUser';
import { storageService } from '../../app/services/async-storage.service';
import { loadUsers, removeUser, setFilter } from '../../app/store/user.actions';


export function _UsersList({ list, loadUsers }) {

    const [isList, setIsList] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [isAddNewUser, setAddNewUser] = useState(false)
    const [userToEdit, setUserToEdit] = useState({})


    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        setIsList(list.length ? true : false)
    }, [list])

    const onToggleEdit = (userToEdit = {}, isAddNewUser = false) => {
        setUserToEdit(userToEdit)
        setToggleEdit(!toggleEdit)
        setAddNewUser(isAddNewUser)
    }

    return (
        <div className='users-list-background'>
            <h1 className='haeder'>Users Librery</h1>
            {isList &&
                <section className='usersList'>
                    <div className="add-section">
                        <button className="add-user" onClick={() => onToggleEdit({}, true)}>Add new User</button>
                    </div>
                    {list.map((user, idx) => <UserPreview user={user} key={idx} toggleEdit={onToggleEdit} />)}
                </section>
            }
            {!isList && <h1>Loding...</h1>}
            {toggleEdit && <EditUser isAddNewUser={isAddNewUser} user={userToEdit} toggleEdit={onToggleEdit} />}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        list: state.users.users,
    }
}
const mapDispatchToProps = {
    loadUsers,
    removeUser,
    setFilter
}

export const UsersList = connect(mapStateToProps, mapDispatchToProps)(_UsersList)