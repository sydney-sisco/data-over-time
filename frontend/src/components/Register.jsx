import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import axios from "axios";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    }

    // TODO: move this to AuthProvider
    axios.post('/api/register', data)
      .then(res => {
        if (res.status === 200) {
          console.log('Registration successful');
          // Handle successful registration here,
          // you might want to redirect the user to the login page
          setLocation("/login");
        }
      });
  }

  return (
    <Box component="form" className="form" onSubmit={handleSubmit} sx={{mt: 8}}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          xs={12}
          sm={8}
          md={5}
          component={Box}
        >
          <Paper elevation={3} sx={{p: 3}}>
            <Avatar>
              <AddIcon />
            </Avatar>

            <Typography component="h1" variant="h5">Create Account</Typography>

            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              autoComplete="username"
              onChange={e => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              type="password"
              autoComplete="new-password"
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{mt: 3,mb: 2}}
            >
              Register
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login!"}
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
