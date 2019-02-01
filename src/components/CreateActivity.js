import React, { Component } from 'react';
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'
import { addActivity } from '../services/ActivityService';
import {Redirect} from 'react-router-dom'
class CreateActivity extends Component {
  state = {
    // ageLevel: null,
    ageLevels: []
  }

  componentDidMount(){
    api.get('/agelevels').then((res) => {
      this.setState({ageLevels: res.data})
      this.setState({ageLevel: res.data[0]})
    }).catch((err) => {
      console.error('Could not fetch age levels', err)
    })
  }
  
  handleChange =(e)=> {
    this.setState({ageLevel: this.state.ageLevels[e.target.value]})
  }

  handleSubmit = async (e) => {
    const token = localStorage.getItem("token")
    setJwt(token)
    e.preventDefault()
    try{
      const {title, description, length} = e.target.elements
      const req = {
        title: title.value,
        description: description.value,
        length: length.value,
        ageLevel: this.state.ageLevel
      }
      addActivity(req)
    }
    catch(error){console.error(error)}
  }

  // handleCreateActivity = async (event) => {
  //   event.preventDefault()
  //   const {title, description, length} = event.target.elements
  //   const response = await api.post('/activities', {
  //     title: title.value,
  //     description: description.value,
  //     length: length.value,
  //     ageLevel: ageLevel.value
  //   })
  // }
  render() {
    return (
      <div>
                                {/* <button onClick={() => {
                            fetchActivity(activity._id);
                             props.history.push(`/activities/${activity._id}`);
                             }}>View</button> */}
        <form onSubmit={ (e) => {this.handleSubmit(e); this.props.history.push(`/user`)} }>
        <h1>Create new activity</h1>
        <p>Age Level</p>
        <select onChange={this.handleChange} >
          { this.state.ageLevels.map((ageLevel,index) =>
            <option key={index} value={index}>{ageLevel.name}</option>
          )}
        </select>
        <br/>
        <TextField
          required
          id="title"
          label="Title"
          margin="normal"
          type="title"
          style={{width: "20rem"}}
        />

            <br />

        <TextField
          required
          id="description"
          label="Description"
          margin="normal"
          type="description"
          multiline={true}
          rowsMax="10"
          style={{width: "25rem"}}
          // rows={2}
          // rowsMax={4}
        />

            <br/>

        <p>Category</p>
        <TextField
          required
          id="length"
          label="Length"
          margin="normal"
          type="length"
          style={{width: "20rem"}}
        />

        <p>Attachments</p>
        <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Create</Button>
        </form>
      </div>
      
    )
  }
}
export default CreateActivity;