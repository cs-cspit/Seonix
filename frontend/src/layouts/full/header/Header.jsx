import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Typography,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import _ from 'lodash';

// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

// Styled wrapper to add purple glow on hover around avatar
const ProfileWrapper = styled('div')(({ theme }) => ({
  borderRadius: '50%',
  display: 'inline-block',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 0 8px 2px #8C4AF2',
  },
}));

const Header = (props) => {
  const { userInfo } = useSelector((state) => state.auth);

  // Optional notification menu anchor logic placeholder (not implemented here)
  const anchorEl2 = null;

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: '2px',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* Hamburger menu for mobile */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: { lg: 'none', xs: 'inline' },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        {/* Welcome Text */}
        <Typography
          variant="body1"
          sx={{
            ml: 1,
            fontWeight: 600,
            color: '#8C4AF2',
            display: { xs: 'none', sm: 'block' },
            whiteSpace: 'nowrap',
          }}
        >
          <h2>Welcome back, {_.startCase(userInfo.name)}!</h2>
        </Typography>

        <Box flexGrow={1} />

        {/* Profile and Notification Group */}
        <Stack spacing={1} direction="row" alignItems="center">
          {/* Avatar with purple glow on hover and username tooltip */}
          <Tooltip title={_.startCase(userInfo.name)} arrow>
            <ProfileWrapper>
              <Profile />
            </ProfileWrapper>
          </Tooltip>

          {/* Notification Icon */}
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
              ml: 1,
              ...(typeof anchorEl2 === 'object' && {
                color: 'primary.main',
              }),
              display: { xs: 'none', sm: 'inline-flex' }, // hide on xs, show on sm+
            }}
          >
            <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge>
          </IconButton>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;
