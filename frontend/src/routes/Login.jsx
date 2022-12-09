import React , {useState} from "react";

import { useNavigate } from "react-router-dom";

import { IHCButtonRounded } from "../assets/ComponentStyle";

import Image from "mui-image"

import { IHCTextField } from "../assets/ComponentStyle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [error, setError] = useState([false,false,false,false]);


  const handleClickBack = () => {
    navigate("/");

  }
  // Login Button handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo = {
      identifier: data?.get("email"),
      password: data?.get("password"),
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    };
    const res = await fetch('/api/v1/login/signin',options);
    const json = await res.json();

    console.log(json);

    if(json.error){
      let errors = [false,false,false,false];
      errors[json.code] = true;
      setError(errors);
    }
    if(json.user){
      localStorage.setItem("usersdatatoken", json.token)
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
            <Paper elevation={8}  sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 3, }} >
              <Typography variant="h3">Enter Administrator Area</Typography>
              <Typography variant="body2" color="text.light">Go <Link href="/" color="primary">back</Link> if you are not an administrator</Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                <IHCTextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={<Typography variant="button">Email Address</Typography>}
                  name="email"
                  autoComplete="email"
                  error={error[0]?error[0]:error[1]?error[1]:error[2]}
                  helperText={error[0]?"User not found!":error[1]?"Fill user email!":""}
                  autoFocus
                />
                <IHCTextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={<Typography variant="button">Password</Typography>}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={error[2]?error[2]:error[1]?error[1]:error[3]}
                  helperText={error[2]?"Invalid Authentication!":error[1]?"Fill your password":"Fill your password"}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" sx={{ ml:0.3, borderRadius:50 }} color="secondary" />}
                  label={ <Typography variant="inputLabel" color="secondary.dark">Remember me</Typography> }
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
                    <Link variant="inputLabel" underline='hover' color="secondary" href="#" onClick={ () => setForgot(!forgot) }>
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          :
            <Stack sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 3, }} >
              <Typography textAlign="center" variant="h5">Enter your email address so we can send an reset password link</Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                <IHCTextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={<Typography variant="button">Email</Typography>}
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
                  <Typography variant="button">
                    Send password reset!
                  </Typography>
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
