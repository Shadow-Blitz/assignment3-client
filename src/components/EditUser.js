import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { TextField, Button } from '@material-ui/core'

class EditUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: { name: {}, unit: {} },
            units: []
        }

    }




    componentDidMount() {
        const token = localStorage.getItem('token')
        setJwt(token)

        api.get('/users').then((res) => {
            this.setState({ user: { ...res.data } })
            console.log(this.state.user.unit)
        }).catch((err) => {
            console.error('Could not fetch user', err)
        })

        api.get('/units').then((res) => {
            this.setState({ units: res.data })
        }).catch((err) => {
            console.error('Could not fetch age levels', err)
        })

    }

    // _change = (value) => event => {
    //     switch(value)
    // }

    _changeEmail = () => event => {
        this.setState({
            user: {
                ...this.state.user,
                email: event.target.value
            }
        });
    }

    _changeFirstname = () => event => {
        this.setState({
            user: {
                ...this.state.user,
                name: { ...this.state.user.name, firstname: event.target.value }
            }
        })

        console.log(this.state.user._id)
    }

    _changeLastname = () => event => {
        this.setState({
            user: {
                ...this.state.user,
                name: { ...this.state.user.name, lastname: event.target.value }
            }
        })
    }

    _changeUnit = () => event => {
        this.setState({
            user: {
                ...this.state.user,
                unit: this.state.units[event.target.value]
            }
        })

        console.log(this.state.user.unit)
    }

    _changeGuideName = () => event => {
        this.setState({
            user: {
                name: { ...this.state.user.name, guidename: event.target.value }
            }
        })
    }

    _changePhone = () => event => {
        this.setState({
            user: {
                phone: { ...this.state.user, phone: event.target.value }
            }
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        setJwt(token)

        // Getting values from the fields
        const { email, firstname, lastname, guidename } = event.target.elements

        // Structuring the object and assigning fields
        const load = {
            email: email.value,
            name: {
                firstname: firstname.value,
                lastname: lastname.value,
                guidename: guidename.value
            },
            unit: this.state.user.unit
        }

        // console.log(load)
        api.put('/users', load)
            .then((res) => {
                // this.props.history.push('/user')
            })
            .catch((err) => {
                console.log(err)
            })

        this.props.history.push(`/user`)
    }

    render() {
        return (<form onSubmit={this.handleSubmit}>

            <h2>Edit Profile</h2>
            <TextField
                required
                id="email"
                label="Email"
                margin="normal"
                type="email"
                value={this.state.user.email}
                onChange={this._changeEmail()}
            /><br />
            <TextField
                required
                id="firstname"
                label="First Name"
                margin="normal"
                type='firstname'
                value={this.state.user.name.firstname}
                onChange={this._changeFirstname()}
            /><br />
            <TextField
                required
                id="lastname"
                label="Lastname"
                margin="normal"
                type="lastname"
                value={this.state.user.name.lastname}
                onChange={this._changeLastname()}

            /> <br />

            <TextField
                required
                id="guidename"
                label="Guide Name"
                margin="normal"
                type="guidename"
                value={this.state.user.name.guidename}
                onChange={this._changeGuideName()}

            />
            <br />

            <TextField
                required
                id="phone"
                label="Guide Name"
                margin="normal"
                type="phone"
                value={this.state.user.phone}
                onChange={this._changePhone()}

            />
            <br />

            <select type='unitName' id='unitName'
                onChange={this._changeUnit()}
            >
                {/* <option key={this.state.user.unit._id} value={this.state.user.unit.name}>{this.state.user.unit.name}</option> */}
                {this.state.units.map((unit, index) =>
                    <option key={index} value={index}>{unit.name}</option>
                )};
                </select>

            <br />
            <Button type="submit" variant="contained" color="primary">Change</Button>
        </form>)
    }

}

export default EditUser

