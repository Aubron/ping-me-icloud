import React, { useState } from 'react';
import { Button, Typography, TextField, CssBaseline, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: "#252526",
    height: "100vh",
    width: "100vw"
  },
  paper: {
    position: "relative",
    top: "10%",
    margin: 'auto',
    maxWidth: 400,
    minHeight: 200,
    padding: 16
  },
  input: {
    marginTop: 16,
    marginBottom: 32
  }
}

function App({classes}) {
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = event => {
    setPassword(event.target.value);
  };

  const handleClick = () => {
    setPassword("");
    setMessage("");
    setFailed(false);
    fetch(process.env.REACT_APP_ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ secret: password })
    }).then((res) => {
      if (res.status === 200) {
        setMessage("Ping sent. Tada!")
      } else {
        setFailed(true);
        setMessage("Password Incorrect");
      }
    })
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Aubron iCloud Ping Tool
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter your provided password in the box below, and hit send to ping Aubron's phone. This bypasses do not disturb, volume settings, etc. Use with caution.
        </Typography>
        { message !== "" ? 
          <Typography variant="body1" gutterBottom color={failed ? 'error' : 'primary'}>
            {message}
          </Typography> :
          null
        }
        <TextField id="outlined-basic" label="Password" variant="outlined" className={classes.input} fullWidth value={password} onChange={handleChange}/>
        <Button variant="contained" color="primary" fullWidth onClick={handleClick} disabled={(password === "")}>
          Primary
        </Button>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(App);
