import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Logout from './Logout';

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

          {user?.username}
          <Logout />

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserPage;
