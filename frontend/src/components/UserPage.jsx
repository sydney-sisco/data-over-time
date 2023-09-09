import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Logout from './Logout';
import Typography from '@mui/material/Typography';

function UserPage({ user, onLogout }) {
  return (
    <Box sx={{ mt: 8 }}>
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
          <Paper elevation={3} sx={{ p: 3 }}>

          <Typography component="h1" variant="h5">Hello {user?.username}</Typography>
          <br/>
          <Logout />

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserPage;
