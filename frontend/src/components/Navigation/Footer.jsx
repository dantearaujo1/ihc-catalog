import React from 'react';

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';

const IHCFooter = () => {
  return (
    <Stack
      backgroundColor="primary.main"
      alignItems="space-around"
      pt={6}
      pb={6}
      height="100%"
    >
        <Stack
          direction="row"
          height="100%"
          justifyContent="space-around"
          alignItems="center"
        >
        <Stack spacing={4} width="100%" pl={19}>
            <Typography color="white" textAlign="left" variant="h3">
                HCI Catalog
            </Typography>
            <Typography color="white"  variant="body2">
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
            </Typography>
            <Typography color="white"  variant="caption">
                Copyright @ 2022. All rights reserved.
            </Typography>
        </Stack>
        <Stack width="100%" spacing={2} ml="auto" alignItems="center" justifyContent="center" >
            <Typography color="white" variant="body2">
              <Link href="/" underline="hover" color="inherit">
                Home
              </Link>
            </Typography>
            <Typography color="white" variant="body2">
              <Link href="/" underline="hover" color="inherit">
                About
              </Link>
            </Typography>
            <Typography color="white" variant="body2">
              <Link href="/" underline="hover" color="inherit" sx={{textAlign:"left"}}>
                FAQ
              </Link>
            </Typography>
            <Typography color="white"  variant="body2">
              <Link href="/" underline="hover" textAlign="left" color="inherit">
                Contact
              </Link>
            </Typography>

        </Stack>
        <Stack direction="row" spacing={ 4 } justifyContent="center" width="100%" >
            <Typography color="white" variant="h7">
              <Link target="_blank" href="https://www.instagram.com.br/celulamultimidia/?igshid=YmMyMTA2M2Y%3D" rel="noreferrer" underline="hover" color="inherit">
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              </Link>
            </Typography>
            <Typography color="white" variant="h7">
              <Link target="_blank" href="https://www.youtube.com.br/channel/UC7S8lZMUk12LPKQN9Y4Hrug/featured" rel="noreferrer" underline="hover" color="inherit">
                <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
              </Link>
            </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default IHCFooter
