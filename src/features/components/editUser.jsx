import React, { useEffect, useState } from 'react';

export function EditUser({ user, toggleEdit, onEditUser }) {

    const [inputValues, setInputValue] = useState(user.name ? {
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        country: user.location.country,
        city: user.location.city
    } : {
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        city: ""
    });

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setInputValue({ ...inputValues, [name]: value });

    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const updatedUser = {
            ...user,
            name: {
                ...user.name,
                first: inputValues.firstName,
                last: inputValues.lastName
            },
            location: {
                ...user.location,
                city: inputValues.city,
                country: inputValues.country
            },
            email: inputValues.email
        }
        // console.log(updatedUser);
        onEditUser(updatedUser)
        toggleEdit()
    }

    const stopPropagation = (ev) => {
        ev.stopPropagation()
    }


    return (
        <div className='background-edit' onClick={() => { toggleEdit() }}>
            <div className="edit-forms" onClick={stopPropagation}>
                <h3 className='edit-header'>Edit user</h3>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="form-control">
                        <label><span>First Name</span>
                            <input
                                placeholder="First Name"
                                type="string"
                                name="firstName"
                                id="firstName"
                                className="input-field"
                                onChange={(e) => handleChange(e)}
                                value={inputValues.firstName}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label><span>Last Name</span>
                            <input
                                placeholder="Last Name"
                                type="string"
                                name="lastName"
                                id="lastName"
                                className="input-field"
                                onChange={(e) => handleChange(e)}
                                value={inputValues.lastName}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label ><span>Email</span>
                            <input
                                placeholder="Email"
                                type="email"
                                id="email"
                                name="email"
                                className="input-field"
                                onChange={(e) => handleChange(e)}
                                value={inputValues.email}
                                required
                            />
                        </label>
                    </div>

                    <div className="form-control">
                        <label><span>Country</span>
                            <input
                                placeholder="Country"
                                type="text"
                                id="country"
                                name="country"
                                className="input-field"
                                onChange={(e) => handleChange(e)}
                                value={inputValues.country}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label><span>City</span>
                            <input
                                placeholder="City"
                                type="text"
                                id="city"
                                name="city"
                                className="input-field"
                                onChange={(e) => handleChange(e)}
                                value={inputValues.city}
                                required
                            />
                        </label>
                    </div>

                    <button type="submit">
                        submit
                    </button>

                </form>
            </div>
        </div>
    );
}