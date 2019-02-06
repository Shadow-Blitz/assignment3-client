import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'

class CreateProgram extends Component {


    handleSubmit = (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()

        try {
            const { name, description, len, date } = e.target.elements
            console.log(len.value)
            const length = parseInt(len.value)
      if (isNaN(length) || length < 1 || length > 120) {
        alert('Length must be between 1 and 120 minutes and digits only')
        return
      }
            api.post('/programs', {
                name: name.value,
                description: description.value,
                date: date.value,
                length: len.value
            })
                .then((response) => {
                    this.props.history.push(`/programs/${response.data._id}/updateactivities`)
                })

        }
        catch (error) { console.error(error) }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {console.log(this.props.history)}
                    <h1>Create a new program for your unit</h1>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        margin="normal"
                        type="name"
                    />
                    <br />
                    <TextField
                        required
                        id="description"
                        label="Description"
                        margin="normal"
                        type="description"
                    />
                    <br />
                    <p>Date</p>
                    <TextField
                        required
                        id="date"
                        // label="Date"
                        margin="normal"
                        type="date"
                    />
                    <br />
                    <TextField
                        required
                        id="len"
                        label="Length"
                        margin="normal"
                        type="length"
                    />
                    <p>Attachments</p>
                    <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Create</Button>
                </form>
            </div >

        )
    }
}

export default CreateProgram