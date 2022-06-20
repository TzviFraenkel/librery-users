import React, { useEffect, useState } from 'react';
import { connect } from "react-redux"
import { FaSearch } from "react-icons/fa"



import { UserPreview } from './userPreview';
import { EditUser } from './editUser';
// import { storageService } from '../../app/services/async-storage.service';
import { loadUsers, removeUser } from '../../app/store/user.actions';


export function _UsersList({ list, loadUsers }) {

    // const [isList, setIsList] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [isAddNewUser, setAddNewUser] = useState(false)
    const [userToEditId, setUserToEditId] = useState({})
    const [search, setSearch] = useState('')
    const [filterdList, setFilterdList] = useState([])

    const [usersPerPage, setUsersPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    // const [currPageUsers, setCurrPageUsers] = useState([])

    //data fetching 
    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        setFilterdList(list)
        setSearch('')
    }, [list])

    const onToggleEdit = (userToEditId = {}, isAddNewUser = false) => {
        setUserToEditId(userToEditId)
        setToggleEdit(!toggleEdit)
        setAddNewUser(isAddNewUser)
    }

    const handleSearchChange = (ev) => {
        setSearch(ev.target.value)
    }

    const handleSearchSubmit = (ev) => {
        ev.preventDefault();
    }

    useEffect(() => {
        handleFilterdList()
    }, [search])

    const handleFilterdList = () => {
        const lowerSearch = search.toLowerCase()
        let filterd = list.filter(user => lowerSearch === ""
            || (user.name.title + ' ' + user.name.first + ' ' + user.name.last).toLowerCase().includes(lowerSearch)
            || (user.location.country + ' ' + user.location.city).toLowerCase().includes(lowerSearch)
            || (user.location.city + ' ' + user.location.country).toLowerCase().includes(lowerSearch)
            || user.email.toLowerCase().includes(lowerSearch)
            || user.phone.toLowerCase().includes(lowerSearch)
        )
        setFilterdList(filterd)
    }
    const onSelectPage = (diff) => {
        let page = currentPage
        page += diff
        if (page === 0) page = 1
        if (page > Math.ceil(filterdList.length / usersPerPage)) page -= 1
        setCurrentPage(page)
    }
    const indexOfFirstUser = (currentPage - 1) * usersPerPage;
    //is the last page?
    const indexOfLastUser = !(currentPage === Math.ceil(filterdList.length / usersPerPage))
        ? indexOfFirstUser + usersPerPage
        : indexOfFirstUser + (filterdList.length % usersPerPage);
    const currentUsers = filterdList.slice(indexOfFirstUser, indexOfLastUser);


    return (
        <div className='users-list-background'>
            <header className="header-section">
                <h1 className='haeder'>Users Librery</h1>
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input onChange={handleSearchChange} value={search} type="search" name="search-box" placeholder="Search" />
                    <FaSearch />
                </form>
                <div className="paging-nav">
                    <button className='page-button' onClick={() => onSelectPage(-1)}>previous Page</button>
                    <button className='page-button' onClick={() => onSelectPage(1)}>Next Page</button>
                </div>
            </header>
            {list.length ?
                <section className='usersList'>
                    <div className="add-section">
                        <button className="add-user" onClick={() => onToggleEdit({}, true)}>Add new User</button>
                    </div>
                    {currentUsers.map((user, idx) => <UserPreview user={user} key={idx} toggleEdit={onToggleEdit} />)}
                </section>

                : <h1 className='loading'>Loding...</h1>}
            {toggleEdit && <EditUser isAddNewUser={isAddNewUser} userId={userToEditId} toggleEdit={onToggleEdit} />}
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