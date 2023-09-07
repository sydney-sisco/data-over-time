import { useState, useContext } from 'react';
import axios from "axios";
import { AuthContext } from '../AuthProvider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from "wouter";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    const res = await axios.post('/api/login', data);
    if (res.status === 200) {
      console.log('Login successful');
      login(res.data.token);
    }
  };

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
              <LockOpenIcon />
            </Avatar>

            <Typography component="h1" variant="h5">Login</Typography>

            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              onChange={e => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{mt: 3,mb: 2}}
            >
              Login
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up!"}
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
