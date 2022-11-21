import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { IHCButtonRounded } from "../assets/ComponentStyle";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

// import CssBaseline from "@mui/material/CssBaseline";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogActions from "@mui/material/DialogActions";

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Login() {
  const navigate = useNavigate();

  // Alert Dialog state - OLD
  // const [open, setOpen] = useState(true);

  const handleClickClose = () => {
    setOpen(false);
  }
  const handleClickBack = () => {
    navigate("/");
  }
  // ==

  // Login Button handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = {
      identifier: data.get("email"),
      password: data.get("password"),
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result)
    };
    const okay = await fetch('/api/v1/login/signin',options);
    if(okay.ok === true){
      navigate("/admin_dboard");
    }
  };

  return (
    <Stack height="100vh" justifyContent="center">
      <Container  component="main"  maxWidth="xs">
        {/* OLD MODAL */}
        {/* <Dialog */}
        {/*   open={open} */}
        {/* > */}
        {/*   <DialogTitle> */}
        {/*     {"This area is restrict to administrator"} */}
        {/*   </DialogTitle> */}
        {/*   <DialogContent> */}
        {/*     <DialogContentText> */}
        {/*       If you're not an administrator you should go back. */}
        {/*     </DialogContentText> */}
        {/*     <DialogActions> */}
        {/*       <Button onClick={handleClickBack}>Back</Button> */}
        {/*       <Button onClick={handleClickClose}>Im Admin</Button> */}
        {/*     </DialogActions> */}
        {/*   </DialogContent> */}
        {/* </Dialog> */}
        <Stack
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" color="error.dark">Administrator Page</Typography>
          <Typography color="error.dark">Go <Link href="/" color="primary">back</Link> if you are not an administrator</Typography>
          <Avatar sx={{ m: 2, bgcolor: "black" }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" sx={{ ml:0.3 , borderRadius:50 }} color="primary" />}
              label="Remember me"
            />
            <IHCButtonRounded
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 50}}
            >
              Sign In
            </IHCButtonRounded>
            <Grid container >
              <Grid item xs={12} textAlign="center" >
                {/* Todo: Correct Forgot Password Page */}
                <Link href="#"  variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}

export default Login;
