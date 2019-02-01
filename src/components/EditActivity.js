import React, { Component } from 'react';
import { api, setJwt } from '../api/init'
import { Paper, Button, TextField } from '@material-ui/core'

class EditActivity extends Component {
  state = {
    title: '',
    description: '',
    length: '',
    ageLevels: []
  }

  componentDidMount(){
    const {id} = this.props.match.params
    api.get(`/activities/${id}`).then((res) => {
        this.setState({...res.data})
    }).catch((err) => {
      console.error('Could not fetch age levels', err)
    })
    
    api.get('/agelevels').then((res) => {
      this.setState({ageLevels: res.data})
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
      const {id} = this.props.match.params
      const {title, description, length} = e.target.elements
      const response = await api.put(`/activities/${id}`, {
        title: title.value,
        description: description.value,
        length: length.value,
        ageLevel: this.state.ageLevel
     })
     this.props.history.push(`/user`)
    }
    catch(error){console.error(error)}
  }

  
  _change = (title,description,length) => event => {
    this.setState({
      [title]: event.target.value,
      [description]: event.target.value,
      [length]: event.target.length
    });
  };

  render() {
    const ageIndex = this.state.ageLevel && this.state.ageLevels.findIndex(ageLevel => ageLevel.name == this.state.ageLevel.name)
    
    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
        <h1>Edit activity</h1>
        <p>Age Level</p>
        <select value={ageIndex} onChange={this.handleChange} >
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
          value={this.state.title}
          onChange={this._change('title')}
          style={{width: "20rem"}}
        />

        <br/>

        <TextField
          required
          id="description"
          label="Description"
          margin="normal"
          type="description"
          value={this.state.description}
          onChange={this._change('description')}
          autoFocus="true"
          rowsMax="10"
          style={{width: "25rem"}}
        />

        <br/>

        <p>Category</p>
        <TextField
          required
          id="length"
          label="Length"
          margin="normal"
          type="length"
          value={this.state.length}
          onChange={this._change('length')}
          focused="true"
          style={{width: "20rem"}}
        />
        
        <p>Attachments</p>
        <Button type="submit" variant='contained' color="primary" style={{ 'backgroundColor': 'orange' }}>Save Changes</Button>
        </form>
      </div>
      
    )
  }
}

export default EditActivity