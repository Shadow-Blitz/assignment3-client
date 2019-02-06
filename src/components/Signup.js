import React from 'react'
import { Paper, Button, TextField } from '@material-ui/core'

const style = {
    Paper: {
        'width': '500px',
        'margin': '10% auto 0 auto',
        'textAlign': 'center',
        'padding': '5%'

    }
}

export default ({ handleSignup, signupError }) => (
    <Paper style={style.Paper}>
        <h2>Register as a New Leader</h2>

        <form onSubmit={handleSignup}>
            {signupError && <p>{signupError}</p>}
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

            <TextField
                required
                id="fristname"
                label="First Name"
                margin="normal"
                type="fristname"
            />
            <br />
            <TextField
                required
                id="lastname"
                label="Last Name"
                margin="normal"
                type="lastname"
            />
            <br />

            <TextField
                required
                id="membershipNo"
                label="Membership Number"
                margin="normal"
                type="membershipNo"
            />
            <br />

            <TextField
                required
                id="phonenumber"
                label="Phone Number"
                margin="normal"
                type="phonenumber"
            />
            <br />

            <select type="unit" id="unit">
                {units.map((unit, index) =>
                    <option key={index} value={index}>{unit.name}</option>)}
            </select>
            <Button type="submit" variant="contained" color="primary" style={{'margin': 15}}>Sign Up</Button>

        </form>

    </Paper>
)