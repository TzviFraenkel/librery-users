import React, { useEffect, useState } from 'react';
import { connect } from "react-redux"
import { FaSearch } from "react-icons/fa"



import { UserPreview } from './userPreview';
import { EditUser } from './editUser';
// import { storageService } from '../../app/services/async-storage.service';
import { loadUsers, removeUser } from '../../app/store/user.actions';


export function _UsersList({ list, loadUsers }) {

    const [isList, setIsList] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [isAddNewUser, setAddNewUser] = useState(false)
    const [userToEdit, setUserToEdit] = useState({})
    const [search, setSearch] = useState('')
    const [filterdList, setFilterdList] = useState([])


    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        setIsList(list.length ? true : false)
        setFilterdList(list)
        setSearch('')
    }, [list])

    const onToggleEdit = (userToEdit = {}, isAddNewUser = false) => {
        setUserToEdit(userToEdit)
        setToggleEdit(!toggleEdit)
        setAddNewUser(isAddNewUser)
    }

    const handleChange = (ev) => {
        setSearch(ev.target.value)
    }

    useEffect(() => {
        handleFilterdList()
    }, [search])

    const handleFilterdList = () => {
        const lowerSearch = search.toLowerCase()
        let filterd = list.filter(user => lowerSearch === ""
            || user.name.title.toLowerCase().includes(lowerSearch)
            || user.name.first.toLowerCase().includes(lowerSearch)
            || user.name.last.toLowerCase().includes(lowerSearch)
            || user.email.toLowerCase().includes(lowerSearch)
            || user.location.city.toLowerCase().includes(lowerSearch)
            || user.location.country.toLowerCase().includes(lowerSearch)
            || user.phone.toLowerCase().includes(lowerSearch)
        )
        setFilterdList(filterd)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
    }

    return (
        <div className='users-list-background'>
            <header className="header-section">
                <h1 className='haeder'>Users Librery</h1>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={search} type="search" name="search-box" placeholder="Search" />
                    <FaSearch />
                </form>
            </header>
            {isList &&
                <section className='usersList'>
                    <div className="add-section">
                        <button className="add-user" onClick={() => onToggleEdit({}, true)}>Add new User</button>
                    </div>
                    {filterdList.map((user, idx) => <UserPreview user={user} key={idx} toggleEdit={onToggleEdit} />)}
                </section>
            }
            {!isList && <h1 className='loading'>Loding...</h1>}
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
    removeUser
}

export const UsersList = connect(mapStateToProps, mapDispatchToProps)(_UsersList)