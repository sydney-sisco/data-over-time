import { Button } from "@mui/material";
import { Link } from "wouter";

function Gate() {
  return (
    <>
      <div>
      <Link href="/login">
        <Button sx={{ mx: 2 }} variant="contained">Login</Button>
      </Link>

      <Link href="/register" >
        <Button sx={{ mx: 2 }} variant="contained">Register</Button>
      </Link>
    </div>
    <p>You must be logged in to continue.</p>
    </>
  )
}

export default Gate;
