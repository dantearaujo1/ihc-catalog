import React from 'react';

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';

const IHCFooter = () => {
  return (
    <Box
      className="nav-container"
      backgroundColor="primary.main"
      alignItems="center"
      mt={2}
      height={276}
    >
        <Stack
          direction="row"
          height="100%"
          justifyContent="space-around"
          alignItems="center"
          className="nav-items"
        >
        <Stack spacing={4} width="25%" pl={19}>
            <Typography color="white" textAlign="left" variant="h3">
                HCI Catalog
            </Typography>
            <Typography color="white"  variant="body1">
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
            </Typography>
            <Typography color="white"  variant="body2">
                Copyright @ 2022. All rights reserved.
            </Typography>
        </Stack>
        <Stack width="25%" height="50%" spacing={2} ml="auto" justifyContent="center" >
            <Typography color="white" variant="h6">
              <Link href="/" underline="hover" color="inherit">
                Home
              </Link>
            </Typography>
            <Typography color="white" variant="h6">
              <Link href="/" underline="hover" color="inherit">
                About
              </Link>
            </Typography>
            <Typography color="white" variant="h6">
              <Link href="/" underline="hover" color="inherit" sx={{textAlign:"left"}}>
                FAQ
              </Link>
            </Typography>
            <Typography color="white"  variant="h6">
              <Link href="/" underline="hover" textAlign="left" color="inherit">
                Contact
              </Link>
            </Typography>

        </Stack>
        <Stack direction="row" spacing={ 4 } justifyContent="center" width="25%" >
            <Typography color="white" variant="h4">
              <Link target="_blank" href="https://www.instagram.com.br" rel="noreferrer" underline="hover" color="inherit">
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              </Link>
            </Typography>
            <Typography color="white" variant="h4">
              <Link target="_blank" href="https://www.facebook.com.br" rel="noreferrer" underline="hover" color="inherit">
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
              </Link>
            </Typography>
            <Typography color="white" variant="h4">
              <Link target="_blank" href="https://www.youtube.com.br" rel="noreferrer" underline="hover" color="inherit">
                <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
              </Link>
            </Typography>
            <Typography color="white" variant="h4">
              <Link target="_blank" href="https://www.spotify.com.br" rel="noreferrer" underline="hover" color="inherit">
                <FontAwesomeIcon icon={faSpotify}></FontAwesomeIcon>
              </Link>
            </Typography>

        </Stack>
      </Stack>
    </Box>
  )
}

export default IHCFooter
