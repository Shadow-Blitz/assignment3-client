import React, { Component } from 'react'
import { api, setJwt } from '../api/init'
import store from '../config/store'
import { fetchProgram } from '../services/ProgramService';
import { Paper, Button, TextField } from '@material-ui/core'
// import fetchActivities from '../services/ActivityService'

class UpdateActivitytoProgram extends Component {

    state = {
        options: [],
        activities: []
    }

    onChange = (e) => {
        const options = this.state.options
        console.log(options)

        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(this.state.activities[e.target.value])
        } else {
            // or remove the value from the unchecked checkbox from the array
            let index = options.indexOf(this.state.activities[e.target.value])
            options.splice(index, 1)

        }
    }

    handleSubmit = (e) => {
        const token = localStorage.getItem("token")
        setJwt(token)
        e.preventDefault()
        try {
            api.put(`/programs/${this.props.match.params.id}/addActivities`,
                this.state.options)
                // console.log(this.state.options)
                .then((response) => {
                    this.props.history.push(`/user`)
                })

        }
        catch (error) { console.error(error) }
    }

    componentDidMount() {
        api.get('/activities').then((res) => {
            this.setState({ activities: res.data })
        }).catch((err) => {
            console.log(err)
        })
        fetchProgram(this.props.match.params.id)
    }

    render() {
        const program = store.getState().program

        return (
            <div>

                <h1>Add activities to {program && program.program.name}</h1>

                <form onSubmit={this.handleSubmit}>

                    <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>
                        Add Activities
                    </Button>
                    {this.state.activities.map((activity, index) => (
                        <div key={index} className="input-group">
                            <label>
                                <p> Activity Title: {activity.title}</p>
                                <p>Description: {activity.description}</p>
                                <p>Age Level: {activity.ageLevel.name}</p>
                                <a href={`/activities/${activity._id}`}><button>View</button></a>
                            </label>
                            <input type="checkbox" value={index} onChange={this.onChange} />
                        </div>
                    ))}
                </form>



            </div>
        )
    }
}

export default UpdateActivitytoProgram;