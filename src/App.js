import React, { Component, Fragment } from 'react'; // add Fragment later
import './App.css';
import store from './config/store'
import {
  setBookmarksAction,
  setTokenAction,
  setLoginErrorAction,
  setSignupErrorAction,
  setActivitiesAction,
  setProgramsAction
} from './config/actions'
import { api, setJwt } from './api/init'
import decodeJWT from 'jwt-decode'
// import Bookmark from './components/Bookmark'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom' // add Redirect later
// import { fetchBookmarks, removeBookmark } from './services/BookmarkService'
import { fetchActivities } from './services/ActivityService'
import { fetchPrograms } from './services/ProgramService'

// import TabBar from './components/TabBar'
import BottomNav from './components/BottomNav'
import NotFound from './components/NotFound'
import AboutPage from './components/AboutPage'
import User from './components/User'
import Unit from './components/Unit'
import Library from './components/Library'
import CreateActivity from './components/CreateActivity'
import CreateProgram from './components/CreateProgram'
import Activity from './components/Activity'
import Activities from './components/Activities'
import Program from './components/Program'
import Programs from './components/Programs'
import EditProgram from './components/EditProgram'
import UpdateActivitytoProgram from './components/UpdateActivitytoProgram';
import EditActivity from './components/EditActivity'
import EditUser from './components/EditUser'



class App extends Component {

  componentDidMount() {
    // fetchBookmarks()
    fetchActivities()
    fetchPrograms()
     const token = localStorage.getItem('token')
     if (token) {
       store.dispatch(setTokenAction(token))
       setJwt(token)
    }

    api.get('/units').then((res) => {
      this.units = [...res.data]
      console.log(this.units)
    }).catch((err) => {
      console.error('Could not fetch age levels', err)
    })
  }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      let token = response.data.token
      localStorage.setItem('token', token)
      setJwt(response.data.token)
      store.dispatch(setTokenAction(token))
      fetchActivities()
      fetchPrograms()
    } catch (error) {
      store.dispatch(setLoginErrorAction(error.message))
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch(setTokenAction(null))
      // store.dispatch(setBookmarksAction([]))
      store.dispatch(setActivitiesAction([]))
      store.dispatch(setProgramsAction([]))
      console.log('ping')
    })
  }

  handleSignUp = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/register', {
        email: form.elements.email.value,
        password: form.elements.password.value,
        name: {
          fristname: form.elements.firstname.value,
          lastname: form.elements.lastname.value,
        },
        membershipNo: form.elements.membershipNo,
        phone: form.elements.phonenumber,
        unit: {
          name: ''
        }
      })

      let token = response.data.token
      setJwt(response.data.token)
      store.dispatch(setTokenAction(token))
      // fetchBookmarks()
    } catch (error) {
      store.dispatch(setSignupErrorAction(error.message))
    }

  }

  

  render() {
    // const bookmarks = store.getState().bookmarks
    const activities = store.getState().activities
    const programs = store.getState().programs
    const token = store.getState().token
    const tokenDetails = token && decodeJWT(token)
    // const activity = store.getState().activity
    console.log('activities array',activities)
    return (
      <div className="App">
        {
          
          <Router>
            
            <Fragment>
              {/* <TabBar tokenDetails={tokenDetails} /> */}
              {/* {!tokenDetails ? <Redirect from="*" to="/login" />:null} */}
              <div><BottomNav tokenDetails={tokenDetails} /></div>

              <Switch>
                <Route exact path='/login' render={() => {
                  if (tokenDetails) {
                    return (<Redirect to="/" />)
                  } else {
                    return (<Signin loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />)
                  }
                }} />

                <Route exact path='/signup' render={() => {
                  if (tokenDetails) {
                    return (<Redirect to="/" />)
                  } else {
                    return (<Signup signupError={store.getState().signupError} handleSignUp={this.handleSignUp} />)
                  }
                }} />
               
                <Route exact path="/" render={() => {
                  if (tokenDetails) {
                    return <Redirect to="/user" /> 
                  } else {
                    return <Redirect to="/login" />
                  }
                }} />

                <Route exact path="/activities" render={() => {
                    return <Activities activities={activities} />
                }} />

                <Route exact path="/user" render={() => {
                  if (tokenDetails) {
                    return (<User handleSignOut={this.handleSignOut} />)
                  } else {
                    return <Redirect to="/login" />
                  }
                }} />
                {/* <Route path="/activities/:id" render={() => 
                  <Activity activity={activity}/>
                } /> */}
                <Route exact path="/activities/:id" component={Activity} />
                <Route exact path="/activities/:id/edit" component={EditActivity} />
                <Route path="/user/edit" exact component={EditUser} />
                <Route exact path="/programs" render={() => (
                  <Programs programs={programs} />
                )} />
                
                <Route path="/unit" exact component={Unit} />
                <Route path="/create-program" exact component={CreateProgram} />
                <Route path="/create-program" exact component={CreateProgram} />
                <Route path="/create-activity" exact component={CreateActivity} />
                <Route path="/library" exact component={Library} />
                <Route path="/about" exact component={AboutPage} />
                {/* <Route path="/activity" exact component={Activity} /> */}
                <Route path="/programs/:id" exact component={Program} />
                <Route path="/programs/:id/updateactivities" exact component={UpdateActivitytoProgram} />
                <Route path="/programs/:id/edit" exact component={EditProgram} />
                <Route component={NotFound} />
              </Switch>
            </Fragment>
          </Router>
        }
      </div>
    );
  }
}

export default App;
