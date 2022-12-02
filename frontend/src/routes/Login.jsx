import React , {useState} from "react";

import { useNavigate } from "react-router-dom";

import { IHCButtonRounded } from "../assets/ComponentStyle";

import Image from "mui-image"

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [error, setError] = useState([false,false,false]);


  const handleClickClose = () => {
    setOpen(false);
  }
  const handleClickBack = () => {
    navigate("/");

  }
  // Login Button handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = {
      identifier: data?.get("email"),
      password: data?.get("password"),
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result)
    };
    const okay = await fetch('/api/v1/login/signin',options);
    const json = await okay.json();
    console.log(json);

    if(json.error){
      let errors = [...error];
      errors[json.code] = true;
      setError(errors);
    }
    if(json.user){
      navigate("/admin_dboard");
    }
  };

  return (
    <Stack height="100vh" width="100vw" direction="row">
      <Stack backgroundColor="primary.main" alignItems="center" width="70%">
        <Stack alignItems="center" spacing={8} mt={8} width="75%">
          <Typography variant="h4" textAlign="center" color="white">Welcome to the Administrator Area</Typography>
          <Typography variant="h3" color="white">This is a restricted area for the people who runs the IHC Catalog.</Typography>
        </Stack>
        <Image fit="scale-down" src="../login-purple.png"></Image>
      </Stack>
      <Stack height="auto" width="100%" justifyContent="center">
        <Container  component="main"  maxWidth="sm">
          {!forgot?
            <Stack sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 3, }} >
              <Typography variant="h3">Enter Administrator Area</Typography>
              <Typography color="text.light">Go <Link href="/" color="primary">back</Link> if you are not an administrator</Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={error[0]?error[0]:error[1]}
                  helperText={error[0]?"User not found!":error[1]?"Fill user email!":""}
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
                  error={error[2]?error[2]:error[1]}
                  helperText={error[2]?"Wrong password!":error[1]?"Fill with your password!":""}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" sx={{ ml:0.3, borderRadius:50 }} color="secondary" />}
                  label={ <Typography color="secondary.dark">Remember me</Typography> }
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
                    <Link href="#" onClick={ () => setForgot(!forgot) } variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          :
            <Stack sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 3, }} >
              <Typography textAlign="center" variant="h5">Enter your email address so we can send an reset password link</Typography>
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
                <IHCButtonRounded
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={ () => setForgot(!forgot) }
                  sx={{ mt: 3, mb: 2, borderRadius: 50}}
                >
                  Send password reset!
                </IHCButtonRounded>
              </Box>
            </Stack>
          }
        </Container>
      </Stack>
    </Stack>
  );
}

export default Login;
