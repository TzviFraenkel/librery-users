

export function UserPreview({ user, removeUser, toggleEdit }) {


    return (
        <section className="user-preview">
            <img src={user.picture.medium} alt="" />
            <h1>{user.name.title} {user.name.first} {user.name.last}</h1>
            <p>{user.email}</p>
            <p>{user.location.city}, {user.location.country}</p>
            <p>{user.phone}</p>
            <button onClick={() => {toggleEdit(user)}}>Edit</button>
            <button onClick={() => { removeUser(user._id) }}>Delete</button>
        </section>
    )
}