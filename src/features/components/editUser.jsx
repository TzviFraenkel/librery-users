import React, { useState } from 'react';
import { connect } from "react-redux"
import { updateUser, addUser } from '../../app/store/user.actions';


export function _EditUser({ list, updateUser, addUser, isAddNewUser, userId, toggleEdit }) {

    const user = list.filter(user => user._id === userId)[0]

    const [inputValues, setInputValue] = useState((user && !isAddNewUser) ? {
        title: user.name.title,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        country: user.location.country,
        city: user.location.city,
        phone: user.phone
    } : {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        city: '',
        phone: '',
        medium: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQBhIQExIWFRMXGRUYFhgSFhkXGhMbGBkYGBcYGhkYHSgiGCIlGxgbITEhJSkrLy8vFyAzODMuOigtMiwBCgoKDQ0ODxAQDysZFRkrNysrKysrKysrLSsrNystNy0tLSs3KysrKy0rKzcrKysrKy0tLS03LSsrLTc3KysrLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAABwQGAgUIAQP/xABEEAABAwICBgYGBwYFBQAAAAABAAIDBBEFIQYHEjFBURMiYXGBkRQjMlJygjNCYmOSobEkQ1OissEVJYOT0Rdko7PT/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREh/9oADAMBAAIRAxEAPwC4oiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIC4SyBsZc4hrRmS42AHMk7lpummsamoHOhZ6+pGRY09WM/eP4fCLnMZAG6mjKfFtIajaNzBfe68dPHY/VGe2RzG0RxIQUXHdatBTktiLql/3Psf7hyI+HaWkVetXEaqcx0sTGH3YmGeQDnmLfycVuGj+qajgAdUF1S/k67Ix8jTn8xK3uioooIBHFGyNg3NjaGtHcGiyqIf/AIZpHWAFzqpo7ZhTjxY1zfIhfp/00xh7etKzufUyOP8ASf1VzRNMQwascXZ7M0fy1EgP9C/MYBpFSHaY6pIHuVPSjwY55/pV3RNMQqHWXitFKGVUYdfcKmEwvNuAIDf6TvW44Hrco5iGztfTu5u68f4mi47y0DtVAnha+Ise0Oad4cAQe8FaVj2qygqATEw0z+Bg9jxiPV/DbvQbnR1cc1M2SJ7ZGOza6Nwc1w7CMiv2UCrtHcVwKpdPC4mLe6SDrMIH8aI7suJBA95bzobrTgqnNhqg2CY2Adf1UhO4Bx9gnk7LMAEnJFURERQEREBERAREQEREBERAREQEREHwnJSLWFrJc+Y0dA45nZfMzNzyctiG3bltDP3eaa1dOHPndhtISc9mZ7My9xy6Flu3J1t56vNd9q10AbQxCpqAHVTh1RkRTg8BzeeLvAcS6o6XQXVYLCoxAXJzbBe4F87yn6x+yMuZN7CrxRhsYa0ANAAAAsABuAA3LmiiiIiAiIgIiICIiAptpzquiqGunow2KbMuj3Ry87D9248xkeIzuKSiCI6E6fT4dWeg14f0TTs3eD0lMe332edhmLiwVrgma+Fr2uDmuALS03DgdxBG9app/oRHiVHtNsypYPVycHD+G+29p572nMcQZ7q90vlwzFTh1ZdsO1s9ffTPPb7jr9wuHDIlVFwRfAcl9UUREQEREBERAREQEREBaVrS0sNBgvRxOtUzXbGRvjb9eTwvYdpG8ArcpZA2MucQGgEkncAMySoFTMfpDrCu7a6Am53jo6eM5N7C64HYZCeCDZtTuh3VGJzi5N/R2uzsDvmN95OYb2XPEWrS4RRhsYa0ANAAAGQAGQAHBc0BERARFI9aWsBwnfQUjy212zytNiDxjYRuI+s4btwzvYNv0n1h0VDKYy8yzDfHDZxaeT3E7LD2E37FolbrmqC71NLEwfeudIf5dlTABfVcTVKpNctWH+spoHj7svjPmS9bpo5rQoaqRschNPIcgJrbDicrCQZb921YlQFfENet0UM1aawHUlQykqXl1M4hrHuNzTk7s/4fD7Pde1zG5RRERAU91saGemUBq4W/tETesAM5oxmW9rm5keI4i1CRBMtTelxqKI0MrryRNvE4nOSLds34lmQ+Et5EqmqDafYW/B9No6ynGyx7jNHyDgfXRdxvu5SWG5W3B8RZVYXFUR+xI1rxfeLjceRByPaFUZiIiiiIiAiIgIiICIiDRNceMej6JGFp69Qei+TfL4Fo2fnX4al8E6DRo1Lh16g3HZGwkMHj1nfMFp+uSqdVaZxUcZzY1kbb7hJOQc/Axq10FI2ChjhYLMja1jRyDQGgeQVR+6IiiiIiDXdP8dNBorNO36QgMi+N52QflF3fKvNZOdybniTvPaVYtfU/7BRxcDJI/wAWM2R+Uh81HVYlERFUEREHwq/aoceNXov0bzeSnd0ZJ3uZYGN3ldvyFQJUrUTPs4/Ux+/C1x/032H/ALD5qVYtiIiiiIiDVNZmB+maJTNAvJH62PmXMBu0fE3ab4rV9RWM7eHTURP0Z6WP4JD1gO5+f+oqmoNoyP8ADNbZg3MMskIAyGxL1oR+caqLyiIooiIgIiICIiAiIghGEftmuhziMm1Mx8KcPaw+cbSruoZqo6+smV/2Klw7zIz+zj5q5q1IIiKKIiIJdr4picKpJrZNlcwnltsLhf8A2/zCjS9OaZYGK/Ruam3OcAWE8HtIcw920AD2ErzNNE5kzmPaWvaS1zTvaQbEHuKsSuCIiqCIiAqdqIpScZqpbZMjYy/bI4m3/j/RTBeidV+jpodF2h4tNKelkB3tJADWdlmgXHMuUqxtyIiiiIiAoTrjb6LpyyqaM+jhm73ROcP0Y0K7KM6/Y/8AMKM845wfB0dv1PmrEqytcC0EbjmF9WDgcm1glO7nFEfNgKzlFEREBERAREQEREEM1SDY1jTN+7qW+IkZ/wAFXNQjRseia5XMdkDUVLfCXpHRj+Zqu6tSCIiiiIiAptrM1emreaylaBUW9YzcJwBYEHcHgZZ7xYcAqSiDyXLG5kzmOaWvabOa4FrmnkQcwewrivTmkOitHXt/aIWucBYPHVe3sD2527Ny0es1MQGS8VXIwcpGNkt3EbKupiNpxHaQB2k5AeasNPqXiD/WVkjhyjjaw+bi79FuejuhNDQPD4YQZB+8kO28c7E+z8oCaY0PVpq5cJ2VtazZ2bOhheM7jMPkB3W3hpzvmbWsq8iKKIiICIiAo3r9f+3UQ+xOfzjVkUK12vM+mEdOz2hCxg+OR7rd29qsSrNgEezgVM3lFEPJjQs9cYmBsYaNwAA7hkuSiiIiAiIgIiICIiCFa2InUWsCOsaL7QhnAGW06EhpA8GN/ErjBM18DXtN2uAcDzBFwfJT/XZg/TaNsqWi7qd9zYfu32a7ydsu7mlZep/GfSNEWRE9enPREfYGcR/B1e9hVRvKIiiiIup0l0hgw/DTPO6w3NaM3SO4NaOJ/Ibyg7KeZscJe9wa0C5c4gADmSdynOket2nheWUsZqHD65OxEO42Ln+AAPNTTS/TCpxOpvK7YhBuyFh6jbbi733faPgAteVxNbbiesnE53fTiJvu07AwfidtO/mXQT4zVSOu+qnd8U0hHltWWCioy4sWqWHq1M7fhmkH6OXeYdrCxOB2VU5492dokB7yet5OC1hERYtHtcUb3hlZD0e71kN3s7S5h6zR3FyplBXRT0rZYpGyMducwgg+IXlFdto3pHU4fW9LTvtc9djs2S8Os3+4sRzUxdeoEWu6GaXQYnQbbOpK23SxON3MJ4g/WaeDv0NwtiUUREQFBsP/AMy1xF+9gnL+fUphZh7iY2fiVY09xv0HRaeYG0mzsRfG/qt8va7mlaJqIwWzKisIyyhjuOAs6Qjx2B8pVRXERFFEREBERAREQEREH4VtKyajkhkG0x7XMeD9ZrgQR5FQnRasfgWnzqeZ3qieilccgWHOKbwuCeQc9X1TrXDooarCxWRNvNCDtgC5ki3kdpbm4dm0BmQiKKim+qHTEVNAKGZ3rom+rJP0sY3Z8XN3HmLHnakIrFxOvjpsPknldsxxtLnHsHLmTuA4krzZpbpJLiWLunkuG5iKPhEzgO1x3uPE9gAG867tIturZhzD1WbMk1uLjnGw9ws+32mFS1WJRERVBERAREQEREGdgmLTUeJsqYXbMjOe5w4scOLTx8xmAV6T0Zx2OvwaOpjyDh1mnfG4e0w9oPmLHivLy3vVBpF6LpEKZ5tDUkNz3Nl3Rn5vY7SW8lFXtEWnaytLxh2EbEZHpMoIiHuDc6U9g4czbkbRU/1sY0+v0ojw+DriJwYAPrzvyP4R1b8CXqvaNYO2hwKGlZmI22Jtbbcc3u+ZxJ8VNtS+ipLjicwOe02n2t5vk+bPffNoPxHiFXFUERFFEREBERAREQEREBERBENY+iMmHYqMRpLti2w7qb6aTn8DvIXLTkQFQtANNY8Totl1mVLB6yP3vts5tPLeDkeBO0zwtkhcx7Q5rgQ4OFw4HIgjiolproPPhdd6dQuf0LTtXZm+mPG/vM7eWTsszUflrS0NqIMUmrwTNBI4ve63Wgv9V4H1ALAO4AWO65n6umg2smGtY2nqtmKoOQJyjn+G/sk+6fAncMTTHVRHM501EWwyG5MTvonn7JGcR7gR2DegiyLOxjB6ijqejqIXRO4bQyd8Lh1XeBWCqgiIgIiICIsjD6CWoqRFDG+V5+rGLnvPBo7TYIMdbToJobUYjWtkYTFAxwLprbi03tFf2nAjfubbPdY7jojqks4S17geIgjOX+o8b/hb+I7ls+l+nNLhVL0ETWvnAsyGOwbEOBfb2B9kZn8xFdvphpTDhuGdLIdp5uIowetI7+wHF3DvIBkWi2BVGPaSvq6knoQ4dK4XANvZgj5C2/kDfe7No7o5WY9jBq6l7hDezpbWuAfooW7gBuvuGd7m97jhmHxU1CyCFgZGwWa0cP8AkneSg/eGJrIWsaA1rQA0DIAAWAA4ZLmiKKIiICIiAiIgIiICIiAiIgL4RkvqIJjprqpjnc6ej2YpDcuid9E/ns2+jJ8W9gzK1XB9N8SwiqFLVRukY393PcPaPu5c9pv4hwFleFhYrhUFVS9FPEyVnJ7QbHmDvae0ZojXMK02wzEqfoXuYC7Iw1QaNo77Dau1/gSsHGNU9BM7ai6Sndv9U67D8rwbDsaWrqse1NxPu6knMf3c15Gdwd7Q7ztLWRo/j2GfQmYsGQFO/pmeELr2/AqM6u1NVTb9FUwycuka6LzttrqpNVWJh1ujid2tlFv5gCsputXE6UhtQyO//cROicfItHkF2EWuuW2dHGe1szh+Wwf1Q46RmqvFCfoox3yt/tddlRam6xw9bUQR/AHy/kQz9Vlv11y2yoo/Gc//ADXXP1u4hPJsQRwh3KNj5X+W1/ZDjcMJ1QUUTg6aSWc8iejZ5M63m4ruq7SLC8IpzEHRRkZ9DTtBeTuzazd3ut3qY+haQ4lk81AYf4hFMzxYNnaHyld7gOpkCxqqjLL1dOLDuL3D9GjvQdVj+sutr6j0aijdEHZARjbnf4jKP5cx7y7XQ7VMS8T4gb57XQNde53+teN+f1W+JNyFScD0fpaGn2KeFsYNrkZufb3nm7neJK7NBwhiayIMa0NaAAA0AAAbgANy5oiiiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiD45oLbEXHIrClwemd7VPC74o2H9Qs5EGBHgtK09WmhHdEwfoFmxxhrbNAA5AWH5LkiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg//9k='
    })

    const [errMessage, setErrMessage] = useState('')

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setInputValue({ ...inputValues, [name]: value });
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (inputValues.firstName.length < 3 || inputValues.lastName.length < 3) {
            setErrMessage('Name must have at least 3 letters')
            setTimeout(() => { setErrMessage('') }, 4000)
            return
        } else if (!validateEmail(inputValues.email)) {
            setErrMessage('invalid email adrress')
            setTimeout(() => { setErrMessage('') }, 4000)
            return
        }
        const updatedUser = {
            ...user,
            name: {
                ...user.name,
                title: inputValues.title,
                first: inputValues.firstName,
                last: inputValues.lastName
            },
            location: {
                ...user.location,
                city: inputValues.city,
                country: inputValues.country
            },
            picture: {
                ...user.picture,
                medium: (inputValues.medium) ? inputValues.medium : user.picture.medium,
            },
            email: inputValues.email,
            phone: inputValues.phone
        }
        isAddNewUser ? addUser(updatedUser) : updateUser(updatedUser)
        toggleEdit()
    }

    const stopPropagation = (ev) => {
        ev.stopPropagation()
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) return false;
        const listWithoutUser = list.filter(locUser => locUser._id !== user._id)
        return listWithoutUser.every(user => user.email.toLowerCase() !== email.toLowerCase());
    }

    const inputs = [
        { lable: 'Title', type: 'string', name: 'title' },
        { lable: 'First Name', type: 'string', name: 'firstName' },
        { lable: 'Last Name', type: 'string', name: 'lastName' },
        { lable: 'Email', type: 'email', name: 'email' },
        { lable: 'Country', type: 'string', name: 'country' },
        { lable: 'City', type: 'string', name: 'city' },
    ]
    return (
        <div className='background-edit' onClick={() => { toggleEdit() }}>
            <div className="edit-forms" onClick={stopPropagation}>
                <h3 className='edit-header'>Edit user</h3>
                <form
                    onSubmit={handleSubmit}
                >
                    {inputs.map((input,idx) => 
                        <div className="form-control" key={idx}>
                            <label><span>{input.lable}</span>
                                <input
                                    placeholder={input.lable}
                                    type={input.type}
                                    name={input.name}
                                    id={input.name}
                                    className="input-field"
                                    onChange={(e) => handleChange(e)}
                                    value={inputValues[input.name]}
                                    required
                                />
                            </label>
                        </div>
                    )}

                    {isAddNewUser &&
                        <div className="form-control">
                            <label><span>Phone Number</span>
                                <input
                                    placeholder="Phone Number"
                                    type="string"
                                    id="phone"
                                    name="phone"
                                    className="input-field"
                                    onChange={(e) => handleChange(e)}
                                    value={inputValues.phone}
                                    required
                                />
                            </label>
                        </div>
                    }

                    <span className="errMessage">{errMessage}</span>
                    <button type="submit">
                        submit
                    </button>

                </form>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        list: state.users.users,
    }
}
const mapDispatchToProps = {
    updateUser,
    addUser,
}

export const EditUser = connect(mapStateToProps, mapDispatchToProps)(_EditUser)