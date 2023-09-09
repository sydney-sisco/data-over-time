import React, {useContext} from 'react';
import { AuthContext } from '../AuthProvider';
import Button from '@mui/material/Button';

function Logout() {
  const { logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: figure out ONE place to handle all the clearing of state when a user logs out.
    logout();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" variant="contained">Logout</Button>
    </form>
  );
}

export default Logout;
