import React, { Component } from 'react'
import logo from '../assets/logo.svg'
import { Paper, Button, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
const style = {
    Paper: {
        'width': '500px',
        'margin': '10% auto 0 auto',
        'textAlign': 'center',
        'padding': '5%'

    }
}

export default ({ handleSignIn, loginError }) => (
    <Paper style={style.Paper}>
        <img src={logo} alt="Girl Guides Australia Logo"></img>
        <form onSubmit={handleSignIn}>
            {/* <input type='email' id='email' name="email" placeholder='Enter your email' required /><br /> */}
            {/* <input type='password' id='password' name="password" placeholder='Password' required /><br /> */}
            {loginError && <p>{loginError}</p>}
            <TextField
                required
                id="email"
                label="Email"
                margin="normal"
                type="email"
            />
            <br />
            <TextField
                required
                id="password"
                label="Password"
                margin="normal"
                type="password"
            />
            <br />
            <Button type="submit" variant="contained" color="primary" style={{'margin': 15}}>Sign In</Button>
            <Link to='/signup'><Button type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange', margin: 15 }}>Sign Up</Button></Link>
        </form>

    </Paper >
)


// export default ({ handleSignIn, loginError }) => (
//     <form onSubmit={handleSignIn}>
//         {loginError && <p>{loginError}</p>}
//         <label>Email: <input type="email" name="email" /></label><br />
//         <label>Password: <input type="password" name="password" /></label><br />
//         <button type="submit">Login</button>
//     </form>
// )