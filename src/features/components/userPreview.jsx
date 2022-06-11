import React from 'react';
import { connect } from "react-redux"
import { removeUser } from '../../app/store/user.actions';



export function _UserPreview({ user, removeUser, toggleEdit }) {


    return (
        <section className="user-preview">
            <img src={user.picture.medium} alt="" />
            <h1 className="user-name">{user.name.title} {user.name.first} {user.name.last}</h1>
            <p>{user.email}</p>
            <p>{user.location.city}, {user.location.country}</p>
            <p>{user.phone}</p>
            <div className="buttons">
                <button onClick={() => { toggleEdit(user) }}>Edit</button>
                <button onClick={() => { removeUser(user._id) }}>Delete</button>
            </div>
        </section>
    )
}

const mapDispatchToProps = {
    removeUser,
}

export const UserPreview = connect( null , mapDispatchToProps)(_UserPreview)